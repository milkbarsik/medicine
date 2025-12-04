// patientsForm.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PatientsForm from "./patientsForm";

// Мокаем MyInput, чтобы не тянуть реальные стили/логику
vi.mock("../../../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid={props.name} {...props} />,
}));

// Мокаем сторадж, чтобы не было настоящего zustand
vi.mock("../../../../store/patientsStore", () => ({
  usePatientsStore: () => ({
    addPatients: vi.fn(),
  }),
}));

// Мокаем useFetch так, чтобы НИКАКОЙ async-логики не запускалось
vi.mock("../../../../hooks/useFetch", () => ({
  useFetch: () => ({
    fetching: vi.fn(),
    isLoading: false,
    error: { message: "" },
  }),
}));

// Мокаем сервис, хотя он даже не должен вызываться в этом тесте
vi.mock("../../../../api/services", () => ({
  patientsService: {
    postPatients: vi.fn(),
  },
}));

describe("PatientsForm", () => {
  it("рендерит заголовок и кнопку добавления пациента", () => {
    render(<PatientsForm />);

    expect(
      screen.getByRole("heading", { name: /добавить пациента/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /добавить/i })
    ).toBeInTheDocument();
  });
});
