import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PatientsForm from "./patientsForm";

// мокаем MyInput
vi.mock("../../../../components/input/myInput", () => ({
  default: (props: any) => <input data-testid={props.name} {...props} />,
}));

// мокаем стор
vi.mock("../../../../store/patientsStore", () => ({
  usePatientsStore: () => ({
    addPatients: vi.fn(),
  }),
}));

// мокаем useFetch
vi.mock("../../../../hooks/useFetch", () => ({
  useFetch: () => ({
    fetching: vi.fn(),
    isLoading: false,
    error: { message: "" },
  }),
}));

// мокаем сервис
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
