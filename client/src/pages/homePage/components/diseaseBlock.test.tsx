// DiseaseBlock.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiseaseBlock from "./diseaseBlock";
import { sicksService } from "../../../api/services";

// Мокаем MyInput
vi.mock("../../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid="disease-input" {...props} />,
}));

// Мокаем useInput: здесь поле ввода "знает" болезнь "Грипп"
vi.mock("../../../hooks/useInput", () => ({
  __esModule: true,
  default: () => ({
    value: "Грипп",
    onChange: vi.fn(),
  }),
}));

// Мокаем zustand-стор с болезнями
vi.mock("../../../store/diseasesStore", () => ({
  useDiseasesStore: () => ({
    diseases: [
      { id: 10, title: "Грипп" },
      { id: 20, title: "ОРВИ" },
    ],
  }),
}));

// Мокаем сервис
vi.mock("../../../api/services", () => ({
  sicksService: {
    getSicksOfDisease: vi.fn().mockResolvedValue([
      { id: 1 },
      { id: 2 }, // две записи
    ]),
  },
}));

// Мокаем useFetch
vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (cb: () => Promise<void>) => ({
    fetching: async () => {
      await cb();
    },
    isLoading: false,
    error: { message: "" },
  }),
}));

describe("DiseaseBlock", () => {
  it("при клике на 'Искать' ищет по названию болезни и показывает количество записей", async () => {
    render(<DiseaseBlock />);

    const button = screen.getByRole("button", { name: /искать/i });

    await userEvent.click(button);

    // ожидаем, что сервис вызвали с id болезни 'Грипп', т.е. 10
    expect(sicksService.getSicksOfDisease).toHaveBeenCalledWith(10);

    // вернули массив длиной 2, значит увидим '2'
    expect(await screen.findByText("2")).toBeInTheDocument();
  });
});
