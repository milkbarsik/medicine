import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiseaseForm from "./diseasesForm";

// MyInput => просто input
vi.mock("../../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid={props.name} {...props} />,
}));

// мок стора
vi.mock("../../../store/diseasesStore", () => ({
  useDiseasesStore: () => ({
    addDisease: vi.fn(),
  }),
}));

// мок сервиса
vi.mock("../../../api/services", () => ({
  diseaseService: {
    postDisease: vi.fn().mockResolvedValue({ id: 1, title: "Грипп" }),
  },
}));

// мок useFetch
vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (cb: () => any) => {
    const [error, setError] = require("react").useState({ message: "" });

    const fetching = async () => {
      try {
        await cb();
      } catch (err: any) {
        setError({ message: err.message }); 
      }
    };

    return {
      fetching,
      isLoading: false,
      error,
    };
  },
}));

// тесты
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

    // вытаскиваем мок
    const { diseaseService } = await import("../../../api/services");

    expect(diseaseService.postDisease).toHaveBeenCalledWith({ title: "Грипп" });
  });
});
