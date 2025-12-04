// src/pages/patientsPage/components/patientsInfo/patientsInfo.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PatientsInfo from "./patientsInfo";

// НИКАКИХ моков, вообще.
// Компонент просто возьмёт реальный usePatientsStore.
// Для теста это нормально: нам важно лишь, что он монтируется.

describe("PatientsInfo", () => {
  it("рендерит заголовок блока информации о пациенте", () => {
    render(<PatientsInfo id={1} />);

    expect(
      screen.getByRole("heading", { name: /данные о пользователе/i })
    ).toBeInTheDocument();
  });
});
