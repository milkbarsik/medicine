import { describe, it, expect, vi, beforeEach } from "vitest";

// мокаем db
vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    default: { query },
  };
});

import db from "../../../db";
import sicksService from "./sicks_service";
import ApiError from "../../exceptions/apiError";

type DbMock = ReturnType<typeof vi.fn>;
const dbQuery = db.query as unknown as DbMock;

describe("SicksService", () => {
  beforeEach(() => {
    dbQuery.mockReset();
  });

  it("getSicksOfDisease: возвращает массив sicks, если данные есть", async () => {
    const rows = [
      { id: 1, disease_id: 10, date: "2025-01-01" },
      { id: 2, disease_id: 10, date: "2025-01-02" },
    ];

    dbQuery.mockResolvedValueOnce({ rows });

    const res = await sicksService.getSicksOfDisease(10);

    expect(dbQuery).toHaveBeenCalledTimes(1);
    expect(dbQuery).toHaveBeenCalledWith(expect.any(String), [10]);
    expect(res).toEqual(rows);
  });

  it("getSicksOfDisease: бросает ApiError.NotFound, если записей нет", async () => {
    dbQuery.mockResolvedValueOnce({ rows: [] });

    const promise = sicksService.getSicksOfDisease(10);

    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await expect(promise).rejects.toMatchObject({
      message: "Sicks not found",
    });
  });

  it("getSicksOfDate: возвращает массив sicks по дате", async () => {
    const rows = [
      { id: 1, disease_id: 10, date: "2025-01-01" },
      { id: 2, disease_id: 20, date: "2025-01-01" },
    ];

    dbQuery.mockResolvedValueOnce({ rows });

    const res = await sicksService.getSicksOfDate("2025-01-01");

    expect(dbQuery).toHaveBeenCalledTimes(1);
    expect(dbQuery).toHaveBeenCalledWith(expect.any(String), ["2025-01-01"]);
    expect(res).toEqual(rows);
  });

  it("getSicksOfDate: бросает ApiError.NotFound, если записей нет", async () => {
    dbQuery.mockResolvedValueOnce({ rows: [] });

    const promise = sicksService.getSicksOfDate("2025-01-01");

    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await expect(promise).rejects.toMatchObject({
      message: "Sicks not found",
    });
  });
});
