import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateBlock from "./dateBlock";
import { sicksService } from "../../../api/services";

// мокаем MyInput => просто обычный input
vi.mock("../../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid="date-input" {...props} />,
}));

// мокаем useInput
vi.mock("../../../hooks/useInput", () => ({
  __esModule: true,
  default: () => ({
    value: "2025-01-01",
    onChange: vi.fn(),
  }),
}));

// мокаем сервис, который ходит на бэк
vi.mock("../../../api/services", () => ({
  sicksService: {
    getSicksOfDate: vi.fn().mockResolvedValue([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]),
  },
}));

// мокаем useFetch, он просто вызывает переданный колбэк
vi.mock("../../../hooks/useFetch", () => ({
  useFetch: (cb: () => Promise<void>) => ({
    fetching: async () => {
      await cb();
    },
    isLoading: false,
    error: { message: "" },
  }),
}));

describe("DateBlock", () => {
  it("при клике на 'Искать' запрашивает данные и показывает количество записей", async () => {
    render(<DateBlock />);

    const button = screen.getByRole("button", { name: /искать/i });

    await userEvent.click(button);

    // проверяем, что сервис вызвался с нужной датой
    expect(sicksService.getSicksOfDate).toHaveBeenCalledWith("2025-01-01");

    expect(await screen.findByText("3")).toBeInTheDocument();
  });
});
