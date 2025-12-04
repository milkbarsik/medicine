// src/pages/diseasesPage/diseassesForm/diseasesForm.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiseaseForm from "./diseasesForm";

// ========================
// 1. Моки без переменных
// ========================

// MyInput → просто input
vi.mock("../../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid={props.name} {...props} />,
}));

// мок стора с функцией, объявленной прямо внутри фабрики
vi.mock("../../../store/diseasesStore", () => ({
  useDiseasesStore: () => ({
    addDisease: vi.fn(), // безопасно
  }),
}));

// мок сервиса без внешних переменных!
vi.mock("../../../api/services", () => ({
  diseaseService: {
    postDisease: vi.fn().mockResolvedValue({ id: 1, title: "Грипп" }),
  },
}));

// мок useFetch без внешних переменных
vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (cb: () => any) => {
    const [error, setError] = require("react").useState({ message: "" });

    const fetching = async () => {
      try {
        await cb();
      } catch (err: any) {
        setError({ message: err.message }); // 💥 вызывает перерисовку компонента
      }
    };

    return {
      fetching,
      isLoading: false,
      error,
    };
  },
}));


// ========================
// 2. Тесты
// ========================

describe("DiseaseForm", () => {
  it("рендерит заголовок и кнопку", () => {
    render(<DiseaseForm />);
    expect(screen.getByRole("heading", { name: /добавить болезнь/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /добавить/i })).toBeInTheDocument();
  });

	it("валидирует пустое поле", async () => {
		render(<DiseaseForm />);

		await userEvent.click(screen.getByRole("button", { name: /добавить/i }));

		expect(
			screen.getByText(/название не может быть пустым/i)
		).toBeInTheDocument();
	});

  it("вызывает сервис postDisease при вводе валидных данных", async () => {
    render(<DiseaseForm />);

    const input = screen.getByTestId("title");
    await userEvent.type(input, "Грипп");

    const button = screen.getByRole("button", { name: /добавить/i });
    await userEvent.click(button);

    // вытаскиваем мок из фабрики
    const { diseaseService } = await import("../../../api/services");

    expect(diseaseService.postDisease).toHaveBeenCalledWith({ title: "Грипп" });
  });
});
