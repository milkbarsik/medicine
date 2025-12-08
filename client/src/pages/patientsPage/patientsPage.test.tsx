import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientsPage from "./patientsPage";

// моки для отслеживания пропсов
const mockPatientsListProps = vi.fn();
const mockPatientsInfoProps = vi.fn();
const mockPatientsFormRender = vi.fn();

// мокаем PatientsList
vi.mock("./components/patientsList/patientsList", () => {
  const MockPatientsList = (props: any) => {
    mockPatientsListProps(props);
    return (
      <div data-testid="patients-list">
        Mock PatientsList
        <button onClick={() => props.setPatient(42)}>
          select-patient-42
        </button>
      </div>
    );
  };
  return { default: MockPatientsList };
});

// мокаем PatientsInfo
vi.mock("./components/patientsInfo/patientsInfo", () => {
  const MockPatientsInfo = (props: any) => {
    mockPatientsInfoProps(props);
    return <div data-testid="patients-info">Mock PatientsInfo</div>;
  };
  return { default: MockPatientsInfo };
});

// мокаем PatientsForm
vi.mock("./components/patientsForm/patientsForm", () => {
  const MockPatientsForm = () => {
    mockPatientsFormRender();
    return <div data-testid="patients-form">Mock PatientsForm</div>;
  };
  return { default: MockPatientsForm };
});

describe("PatientsPage", () => {
  it("рендерит список, инфо и форму пациента", () => {
    render(<PatientsPage />);

    expect(screen.getByTestId("patients-list")).toBeInTheDocument();
    expect(screen.getByTestId("patients-info")).toBeInTheDocument();
    expect(screen.getByTestId("patients-form")).toBeInTheDocument();
  });

  it("передаёт выбранный id из PatientsList в PatientsInfo", async () => {
    render(<PatientsPage />);

    // на первом рендере PatientsInfo вызывается с id = null
    expect(mockPatientsInfoProps).toHaveBeenCalled();
    expect(mockPatientsInfoProps.mock.calls[0][0]).toMatchObject({ id: null });

    await userEvent.click(
      screen.getByRole("button", { name: /select-patient-42/i })
    );

    const lastCallArgs =
      mockPatientsInfoProps.mock.calls[mockPatientsInfoProps.mock.calls.length - 1][0];

    expect(lastCallArgs).toMatchObject({ id: 42 });
  });
});
