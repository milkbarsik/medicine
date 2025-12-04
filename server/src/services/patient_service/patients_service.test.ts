import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    default: { query },
  };
});

import db from "../../../db";
import PatientsService from "./patients_service";

type DbMock = ReturnType<typeof vi.fn>;
const dbQuery = db.query as unknown as DbMock;

describe("PatientsService", () => {
  beforeEach(() => {
    dbQuery.mockReset();
  });

  it("getPatients делает SELECT и возвращает список пациентов", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 1, first_name: "Ivan" }],
    });

    const res = await PatientsService.getPatients();

    expect(dbQuery).toHaveBeenCalledWith("select * from patients");
    expect(res).toEqual([{ id: 1, first_name: "Ivan" }]);
  });

  it("getOnePatient делает SELECT по id и возвращает одного пациента", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 5, first_name: "Petr" }],
    });

    const res = await PatientsService.getOnePatient(5);

    // SQL беру из самого сервиса — поправь, если строка у тебя другая
    expect(dbQuery).toHaveBeenCalledWith(
      "select * from patients where id = $1",
      [5]
    );
    expect(res).toEqual({ id: 5, first_name: "Petr" });
  });

  it("postPatients делает INSERT и возвращает созданного пациента", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 2, first_name: "Petr" }],
    });

    const payload = {
			id: 5,
      first_name: "Petr",
      middle_name: "Petrovich",
      last_name: "Petrov",
      gender: "male" as const,
      birthday: "2000-01-01",
      address: "Moscow",
    };

    const res = await PatientsService.postPatient(payload);

    expect(dbQuery).toHaveBeenCalledWith(
      "insert into patients (first_name, middle_name, last_name, gender, birthday, address) values ($1, $2, $3, $4, $5, $6) returning *",
      [
        payload.first_name,
        payload.middle_name,
        payload.last_name,
        payload.gender,
        payload.birthday,
        payload.address,
      ]
    );
    expect(res).toEqual({ id: 2, first_name: "Petr" });
  });
});
