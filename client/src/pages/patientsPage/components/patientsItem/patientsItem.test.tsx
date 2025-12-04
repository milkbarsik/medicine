// patientsItem.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientsItem from "./patientsItem";

describe("PatientsItem", () => {
  it("рендерит ФИО пациента", () => {
    const setPatient = vi.fn();

    render(
      <PatientsItem
        id={1}
        first_name="Ivan"
        middle_name="Ivanovich"
        last_name="Ivanov"
        setPatient={setPatient}
        currentId={null}
      />
    );

    expect(
      screen.getByText("Ivan Ivanovich Ivanov")
    ).toBeInTheDocument();
  });

  it("подсвечивает выбранного пациента", () => {
    const setPatient = vi.fn();

    render(
      <PatientsItem
        id={1}
        first_name="Ivan"
        middle_name="Ivanovich"
        last_name="Ivanov"
        setPatient={setPatient}
        currentId={1}
      />
    );

    const p = screen.getByText("Ivan Ivanovich Ivanov");
    expect(p).toHaveStyle({ color: "#646cff" });
  });

  it("по клику вызывает setPatient с id", async () => {
    const setPatient = vi.fn();

    render(
      <PatientsItem
        id={5}
        first_name="Ivan"
        middle_name="Ivanovich"
        last_name="Ivanov"
        setPatient={setPatient}
        currentId={null}
      />
    );

    await userEvent.click(screen.getByText("Ivan Ivanovich Ivanov"));

    expect(setPatient).toHaveBeenCalledWith(5);
  });
});
