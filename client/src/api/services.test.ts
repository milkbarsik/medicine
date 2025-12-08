import { describe, it, expect, vi, beforeEach } from "vitest";

// мокаем axios-инстанс ($authClient) 
vi.mock("./axios", () => {
  const get = vi.fn();
  const post = vi.fn();
  return {
    $authClient: { get, post },
  };
});

// импортируем сервисы
import {
  diseaseService,
  authUser,
  sicksService,
  patientsService,
  medicineService,
  receptionService,
} from "./services";
import { $authClient } from "./axios";
import type { Patient, Medicine, IReceptionOnPost } from "./types";

beforeEach(() => {
  ( $authClient.get as any ).mockReset();
  ( $authClient.post as any ).mockReset();
});

// disease service
describe("DiseaseService", () => {
  it("getDiseases делает GET 'disease' и возвращает data", async () => {
    ( $authClient.get as any ).mockResolvedValue({
      data: [{ id: 1, title: "Грипп" }],
    });

    const result = await diseaseService.getDiseases();

    expect($authClient.get).toHaveBeenCalledWith("disease");
    expect(result).toEqual([{ id: 1, title: "Грипп" }]);
  });

  it("postDisease делает POST 'disease' с телом и возвращает data", async () => {
    ( $authClient.post as any ).mockResolvedValue({
      data: { id: 10, title: "ОРВИ" },
    });

    const payload = { title: "ОРВИ" };
    const result = await diseaseService.postDisease(payload);

    expect($authClient.post).toHaveBeenCalledWith("disease", payload);
    expect(result).toEqual({ id: 10, title: "ОРВИ" });
  });
});

// sicks service
describe("SicksService", () => {
  it("getSicksOfDisease делает GET на нужный путь", async () => {
    ( $authClient.get as any ).mockResolvedValue({
      data: [{ id: 1, disease_id: 5 }],
    });

    const res = await sicksService.getSicksOfDisease(5);

    expect($authClient.get).toHaveBeenCalledWith("sicks_of_disease/5");
    expect(res).toEqual([{ id: 1, disease_id: 5 }]);
  });

  it("getSicksOfDate делает GET на sicks_of_date/:date", async () => {
    ( $authClient.get as any ).mockResolvedValue({
      data: [{ id: 2, date: "2025-01-01" }],
    });

    const res = await sicksService.getSicksOfDate("2025-01-01");

    expect($authClient.get).toHaveBeenCalledWith("sicks_of_date/2025-01-01");
    expect(res).toEqual([{ id: 2, date: "2025-01-01" }]);
  });
});

// patients service
describe("PatientsService", () => {
  it("getPatients делает GET 'patients'", async () => {
    ( $authClient.get as any ).mockResolvedValue({
      data: [{ id: 1, first_name: "Ivan" }],
    });

    const res = await patientsService.getPatients();

    expect($authClient.get).toHaveBeenCalledWith("patients");
    expect(res).toEqual([{ id: 1, first_name: "Ivan" }]);
  });

  it("getOnePatient делает GET 'patients/:id'", async () => {
    ( $authClient.get as any ).mockResolvedValue({
      data: { id: 5, first_name: "Petr" },
    });

    const res = await patientsService.getOnePatient(5);

    expect($authClient.get).toHaveBeenCalledWith("patients/5");
    expect(res).toEqual({ id: 5, first_name: "Petr" });
  });

  it("postPatients делает POST 'patients' с телом", async () => {
    ( $authClient.post as any ).mockResolvedValue({
      data: { id: 2, first_name: "Petr" },
    });

    const payload: Omit<Patient, "id"> = {
      first_name: "Petr",
      middle_name: "Petrovich",
      last_name: "Petrov",
      gender: "male",
      birthday: "2000-01-01",
      address: "Moscow",
    };

    const res = await patientsService.postPatients(payload);

    expect($authClient.post).toHaveBeenCalledWith("patients", payload);
    expect(res).toEqual({ id: 2, first_name: "Petr" });
  });
});

// medicine service
describe("MedicineService", () => {
  it("getMedicines делает GET 'medicines'", async () => {
    ( $authClient.get as any ).mockResolvedValue({
      data: [{ id: 1, title: "Аспирин" }],
    });

    const res = await medicineService.getMedicines();

    expect($authClient.get).toHaveBeenCalledWith("medicines");
    expect(res).toEqual([{ id: 1, title: "Аспирин" }]);
  });

  it("getOneMedicine делает GET 'medicines/:id'", async () => {
    ( $authClient.get as any ).mockResolvedValue({
      data: { id: 3, title: "Ибупрофен" },
    });

    const res = await medicineService.getOneMedicine(3);

    expect($authClient.get).toHaveBeenCalledWith("medicines/3");
    expect(res).toEqual({ id: 3, title: "Ибупрофен" });
  });

  it("postMedicine делает POST 'medicines' с телом", async () => {
    ( $authClient.post as any ).mockResolvedValue({
      data: { id: 4, title: "Нурофен" },
    });

    const payload: Omit<Medicine, "id"> = {
      title: "Парацетамол",
			indications_of_use: "Жар и боль лёгкой/умеренной степени.",
    	side_effects: "Тошнота, аллергические реакции, нарушения функции печени при передозировке.",
    	method_of_use: "По 500 мг 3-4 раза в день после еды."
    };

    const res = await medicineService.postMedicine(payload);

    expect($authClient.post).toHaveBeenCalledWith("medicines", payload);
    expect(res).toEqual({ id: 4, title: "Нурофен" });
  });
});

// reception service
describe("ReceptionService", () => {
  it("postReception делает POST 'reseptions' с телом", async () => {
    ( $authClient.post as any ).mockResolvedValue({
      data: {
        id: 1,
        patient_id: 123,
        date: "2025-01-01",
        place: "Clinic 1",
        symptoms: "кашель",
        description: "описание",
        prescription_description: "по 1 таб.",
        doctor_id: 777,
        medicine_id: 1,
        disease_id: 10,
      },
    });

    const payload: Omit<IReceptionOnPost, "id"> = {
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

    const res = await receptionService.postReception(payload);

    expect($authClient.post).toHaveBeenCalledWith("reseptions", payload);

    expect(res).toEqual(
      expect.objectContaining({
        id: 1,
        patient_id: 123,
        doctor_id: 777,
        medicine_id: 1,
        disease_id: 10,
      }),
    );
  });
});

// Auth user
describe("AuthUser", () => {
  it("login делает POST /login с login/password и возвращает data", async () => {
    ( $authClient.post as any ).mockResolvedValue({
      data: { id: 1, login: "doc", accessToken: "token" },
    });

    const res = await authUser.login("doc", "1234");

    expect($authClient.post).toHaveBeenCalledWith("/login", {
      login: "doc",
      password: "1234",
    });
    expect(res).toEqual({ id: 1, login: "doc", accessToken: "token" });
  });

  it("logOut делает POST /logout без тела", async () => {
    ( $authClient.post as any ).mockResolvedValue({});

    await authUser.logOut();

    expect($authClient.post).toHaveBeenCalledWith("/logout");
  });

  it("refresh делает POST /refresh и возвращает весь AxiosResponse", async () => {
    const mockResponse = {
      data: { id: 1, login: "doc", accessToken: "new-token" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    ( $authClient.post as any ).mockResolvedValue(mockResponse);

    const res = await authUser.refresh();

    expect($authClient.post).toHaveBeenCalledWith("/refresh");
    expect(res).toBe(mockResponse);
  });
});
