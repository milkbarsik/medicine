// src/pages/homePage/homePage.integration.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ===== Моки нижнего уровня =====

// MyInput → обычный <input>, чтобы RTL мог с ним работать
vi.mock("../../components/input/myInput", () => ({
  default: (props: any) => <input {...props} />,
}));

// useInput → простой хук на useState, чтобы можно было реально печатать
vi.mock("../../hooks/useInput", () => {
  return {
    __esModule: true,
    default: (initial: string) => {
      const [value, setValue] = useState(initial);
      return {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value),
      };
    },
  };
});

// zustand-стор болезней
vi.mock("../../store/diseasesStore", () => ({
  useDiseasesStore: () => ({
    diseases: [
      { id: 10, title: "Грипп" },
      { id: 20, title: "ОРВИ" },
    ],
  }),
}));

// --- Мок сервисов: ВСЁ внутри фабрики, без внешних переменных ---
vi.mock("../../api/services", () => {
  const mockGetSicksOfDate = vi.fn().mockResolvedValue([
    { id: 1 },
    { id: 2 },
    { id: 3 }, // 3 вызова по дате
  ]);

  const mockGetSicksOfDisease = vi.fn().mockResolvedValue([
    { id: 1 },
    { id: 2 }, // 2 заболевших по болезни
  ]);

  return {
    __esModule: true,
    sicksService: {
      getSicksOfDate: mockGetSicksOfDate,
      getSicksOfDisease: mockGetSicksOfDisease,
    },
  };
});

// useFetch → "реальная" обёртка: isLoading + error + fetching
vi.mock("../../hooks/useFetch", () => {
  return {
    __esModule: true,
    useFetch: (cb: () => Promise<void>) => {
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<{ message: string }>({
        message: "",
      });

      const fetching = async () => {
        setIsLoading(true);
        try {
          await cb();
        } catch (e: any) {
          setError({ message: e?.message ?? String(e) });
        } finally {
          setIsLoading(false);
        }
      };

      return { fetching, isLoading, error };
    },
  };
});

// ВАЖНО: импортируем HomePage только ПОСЛЕ всех vi.mock()
import HomePage from "./homePage";
import { useState } from "react";

// ===== Сами тесты =====

describe("HomePage (integration)", () => {
  it("отображает заголовки и позволяет искать по дате и по болезни", async () => {
    render(<HomePage />);

    // Приветственный текст
    expect(
      screen.getByRole("heading", { name: /welcome, good work!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/hippocrates is watching over you\./i)
    ).toBeInTheDocument();

    // ---- 1. Поиск по дате (DateBlock) ----
    const dateInput = screen.getByLabelText(
      /выберите дату/i
    ) as HTMLInputElement;

    await userEvent.type(dateInput, "2025-01-01");

    const [dateSearchButton, diseaseSearchButton] = screen.getAllByRole(
      "button",
      { name: /искать/i }
    );

    await userEvent.click(dateSearchButton);

    // достаём мокнутый сервис и смотрим, как он был вызван
    const { sicksService } = await import("../../api/services");

    await waitFor(() => {
      expect(sicksService.getSicksOfDate).toHaveBeenCalledWith("2025-01-01");
    });

    // и появления числа 3 в DOM
    expect(await screen.findByText("3")).toBeInTheDocument();

    // ---- 2. Поиск по названию болезни (DiseaseBlock) ----
		const [diseaseInput] = screen.getAllByLabelText(
			/напишите название болезни/i
		) as HTMLInputElement[];

    await userEvent.clear(diseaseInput);
    await userEvent.type(diseaseInput, "Грипп");

    await userEvent.click(diseaseSearchButton);

    await waitFor(() => {
      expect(sicksService.getSicksOfDisease).toHaveBeenCalledWith(10);
    });

    expect(await screen.findByText("2")).toBeInTheDocument();
  });
});
