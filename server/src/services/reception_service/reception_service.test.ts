import { describe, it, expect, vi, beforeEach } from "vitest";

// мокаем db
vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    default: { query },
  };
});

import db from "../../../db";
import reseptionService from "./reception_service";
import ApiError from "../../exceptions/apiError";

type DbMock = ReturnType<typeof vi.fn>;
const dbQuery = db.query as unknown as DbMock;

describe("ReceptionService", () => {
  const basePayload = {
		patient_name: "Ivan",
    patient_id: 123,
    date: "2025-01-01",
    place: "Clinic 1",
    symptoms: "кашель",
    description: "описание",
    prescription_description: "по 1 таб.",
    doctor_id: 777,
    medicine_id: 1,
    disease_id: 10,
  };

  beforeEach(() => {
    dbQuery.mockReset();
  });

  it("postReception: создаёт приём, если болезнь и лекарство найдены", async () => {
    const diseaseRow = { id: 10, title: "Грипп" };
    const medicineRow = { id: 1, title: "Аспирин" };
    const receptionRow = {
      id: 1,
      ...basePayload,
    };

    dbQuery
      .mockResolvedValueOnce({ rows: [diseaseRow] }) // select disease
      .mockResolvedValueOnce({ rows: [medicineRow] }) // select medicine
      .mockResolvedValueOnce({ rows: [receptionRow] }); // insert reseptions 

    const res = await reseptionService.postReception(basePayload);

    expect(dbQuery).toHaveBeenCalledTimes(3);

    const lastCall = dbQuery.mock.calls[2];
    const params = lastCall[1];

		expect(params).toEqual([
			basePayload.doctor_id,             
			basePayload.patient_id,            
			basePayload.patient_name,         
			basePayload.date,                   
			basePayload.place,                  
			basePayload.symptoms,              
			basePayload.description,            
			basePayload.disease_id,          
			basePayload.medicine_id,            
			basePayload.prescription_description, 
		]);

    expect(res).toEqual(receptionRow);
  });

  it("postReception: бросает ApiError.NotFound, если болезнь не найдена", async () => {
    // 1й запрос - болезнь
    dbQuery.mockResolvedValueOnce({ rows: [] });

    const promise = reseptionService.postReception(basePayload);

    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await expect(promise).rejects.toMatchObject({
      message: "Disease not found",
    });

    expect(dbQuery).toHaveBeenCalledTimes(1);
  });

  it("postReception: бросает ApiError.NotFound, если лекарство не найдено", async () => {
    const diseaseRow = { id: 10, title: "Грипп" };

    dbQuery
      .mockResolvedValueOnce({ rows: [diseaseRow] }) // disease ok
      .mockResolvedValueOnce({ rows: [] }); // medicine not found

    const promise = reseptionService.postReception(basePayload);

    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await expect(promise).rejects.toMatchObject({
      message: "Medicine not found",
    });

    expect(dbQuery).toHaveBeenCalledTimes(2);
  });

  it("postReception: бросает ApiError.BadRequest, если insert не удался", async () => {
    const diseaseRow = { id: 10, title: "Грипп" };
    const medicineRow = { id: 1, title: "Аспирин" };

    dbQuery
      .mockResolvedValueOnce({ rows: [diseaseRow] }) // disease ok
      .mockResolvedValueOnce({ rows: [medicineRow] }) // medicine ok
      .mockRejectedValueOnce(new Error("insert error")); 

    const promise = reseptionService.postReception(basePayload);

    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await expect(promise).rejects.toMatchObject({
      message: "Reception not created",
    });
  });
});
