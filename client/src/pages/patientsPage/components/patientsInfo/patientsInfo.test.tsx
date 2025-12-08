import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PatientsInfo from "./patientsInfo";

// никаких моков
describe("PatientsInfo", () => {
  it("рендерит заголовок блока информации о пациенте", () => {
    render(<PatientsInfo id={1} />);

    expect(
      screen.getByRole("heading", { name: /данные о пользователе/i })
    ).toBeInTheDocument();
  });
});
