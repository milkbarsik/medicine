import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    default: { query },
  };
});

import db from "../../../db";
import MedicineService from "./medicine_service";

type DbMock = ReturnType<typeof vi.fn>;
const dbQuery = db.query as unknown as DbMock;

describe("MedicineService", () => {
  beforeEach(() => {
    dbQuery.mockReset();
  });

  it("getMedicines делает SELECT и возвращает список лекарств", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 1, title: "Аспирин" }],
    });

    const res = await MedicineService.getMedicines();

    expect(dbQuery).toHaveBeenCalledWith("select * from medicines");
    expect(res).toEqual([{ id: 1, title: "Аспирин" }]);
  });

  it("postMedicine делает INSERT и возвращает созданное лекарство", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 2, title: "Парацетамол" }],
    });

    const payload = {
			id: 2,
      title: "Парацетамол",
      indications_of_use: "жар",
      side_effects: "слабость",
      method_of_use: "по 1 таб.",
    };

    const res = await MedicineService.postMedicine(payload);

    expect(dbQuery).toHaveBeenCalledWith(
      "insert into medicines (title, indications_of_use, side_effects, method_of_use) values ($1, $2, $3, $4) returning *",
      [
        payload.title,
        payload.indications_of_use,
        payload.side_effects,
        payload.method_of_use,
      ]
    );
    expect(res).toEqual({ id: 2, title: "Парацетамол" });
  });
});
