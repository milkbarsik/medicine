import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DiseasePage from "./diseasePage";

// мок компонентов
vi.mock("./diseasesList/diseasesList", () => ({
  default: () => <div data-testid="mock-list">Mock List</div>,
}));

vi.mock("./diseassesForm/diseasesForm", () => ({
  default: () => <div data-testid="mock-form">Mock Form</div>,
}));

describe("DiseasePage", () => {
  it("рендерит список и форму", () => {
    render(<DiseasePage />);

    expect(screen.getByTestId("mock-list")).toBeInTheDocument();
    expect(screen.getByTestId("mock-form")).toBeInTheDocument();
  });
});
