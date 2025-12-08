import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DiseaseBlock from "./diseaseBlock";
import { sicksService } from "../../../api/services";

// мокаем MyInput
vi.mock("../../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid="disease-input" {...props} />,
}));

// мокаем useInput
vi.mock("../../../hooks/useInput", () => ({
  __esModule: true,
  default: () => ({
    value: "Грипп",
    onChange: vi.fn(),
  }),
}));

// мокаем стор с болезнями
vi.mock("../../../store/diseasesStore", () => ({
  useDiseasesStore: () => ({
    diseases: [
      { id: 10, title: "Грипп" },
      { id: 20, title: "ОРВИ" },
    ],
  }),
}));

// мокаем сервис
vi.mock("../../../api/services", () => ({
  sicksService: {
    getSicksOfDisease: vi.fn().mockResolvedValue([
      { id: 1 },
      { id: 2 }, 
    ]),
  },
}));

// мокаем useFetch
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

    expect(sicksService.getSicksOfDisease).toHaveBeenCalledWith(10);

    expect(await screen.findByText("2")).toBeInTheDocument();
  });
});
