import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReceptionPage from "./receptionPage";

// моки функций стора
const mockResetReception = vi.fn();
const mockSetKeyOFReception = vi.fn();

// MyInput => обычный <input>
vi.mock("../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid={props.name} {...props} />,
}));

// сторы лекарств и диагнозов
vi.mock("../../store/medicinesStore", () => ({
  useMedicinesStore: () => ({
    medicines: [],
  }),
}));

vi.mock("../../store/diseasesStore", () => ({
  useDiseasesStore: () => ({
    diseases: [],
  }),
}));

// стор приема
vi.mock("../../store/receptionStore", () => ({
  useReceptionStore: () => ({
    reception: {
      patient_id: "",
      patient_name: "",
      date: "",
      place: "",
      disease: "",
      medicine: "",
      symptoms: "",
      description: "",
      prescription_description: "",
    },
    setKeyOFReception: mockSetKeyOFReception,
    resetReception: mockResetReception,
  }),
}));

// пользователь
vi.mock("../../store/userStore", () => ({
  useAuth: () => ({
    user: { id: 1 },
  }),
}));

// useFetch 
vi.mock("../../hooks/useFetch", () => ({
  useFetch: () => ({
    fetching: vi.fn(), 
    isLoading: false,
    error: { message: "" },
  }),
}));

describe("ReceptionPage", () => {
  it("рендерит заголовок и кнопки", () => {
    render(<ReceptionPage />);

    expect(
      screen.getByRole("heading", { name: /прием пациента/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /отменить прием/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /записать прием/i })
    ).toBeInTheDocument();
  });

  it("по клику 'Отменить прием' вызывает resetReception", async () => {
    render(<ReceptionPage />);

    await userEvent.click(
      screen.getByRole("button", { name: /отменить прием/i })
    );

    expect(mockResetReception).toHaveBeenCalled();
  });
});
