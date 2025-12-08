import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./homePage.tsx";

// Мокаем дочерние компоненты, чтобы юнит-тестировать только HomePage
vi.mock("./components/dateBlock", () => ({
  default: () => <div data-testid="date-block">Mock DateBlock</div>,
}));

vi.mock("./components/diseaseBlock", () => ({
  default: () => <div data-testid="disease-block">Mock DiseaseBlock</div>,
}));

describe("HomePage", () => {
  it("рендерит заголовок и подзаголовок", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /welcome, good work!/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/hippocrates is watching over you\./i)
    ).toBeInTheDocument();
  });

  it("рендерит DateBlock и DiseaseBlock", () => {
    render(<HomePage />);

    expect(screen.getByTestId("date-block")).toBeInTheDocument();
    expect(screen.getByTestId("disease-block")).toBeInTheDocument();
  });
});
