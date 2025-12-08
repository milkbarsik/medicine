import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import PatientsList from "./patientsList";

// информация о пропсах
const mockPatientsItemProps = vi.fn();

// мок PatientsItem
vi.mock("../patientsItem/patientsItem", () => {
  const MockPatientsItem = (props: any) => {
    mockPatientsItemProps(props);
    return <div data-testid={`patient-item-${props.id}`}>MockItem</div>;
  };
  return { default: MockPatientsItem };
});

// мок стора пациентов
vi.mock("../../../../store/patientsStore", () => ({
  usePatientsStore: () => ({
    patients: [
      {
        id: 1,
        first_name: "Ivan",
        middle_name: "Ivanovich",
        last_name: "Ivanov",
      },
      {
        id: 2,
        first_name: "Petr",
        middle_name: "Petrovich",
        last_name: "Petrov",
      },
    ],
  }),
}));

describe("PatientsList", () => {
  it("рендерит элемент списка для каждого пациента и передаёт нужные пропсы", () => {
    const setPatient = vi.fn();

    render(<PatientsList setPatient={setPatient} currentId={2} />);

    expect(mockPatientsItemProps).toHaveBeenCalledTimes(2);

    const firstCall = mockPatientsItemProps.mock.calls[0][0];
    const secondCall = mockPatientsItemProps.mock.calls[1][0];

    expect(firstCall).toMatchObject({
      id: 1,
      first_name: "Ivan",
      middle_name: "Ivanovich",
      last_name: "Ivanov",
      setPatient,
      currentId: 2,
    });

    expect(secondCall).toMatchObject({
      id: 2,
      first_name: "Petr",
      middle_name: "Petrovich",
      last_name: "Petrov",
      setPatient,
      currentId: 2,
    });
  });
});
