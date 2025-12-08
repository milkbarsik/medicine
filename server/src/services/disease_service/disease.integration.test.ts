import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

// мокаем db 
vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    __esModule: true,
    default: { query },
  };
});

// импортируем db и app после моков
import db from "../../../db";
import { app } from "../../../index";

type DbMock = ReturnType<typeof vi.fn>;
const dbQuery = db.query as unknown as DbMock;

describe("GET /api/disease", () => {
  beforeEach(() => {
    dbQuery.mockReset();
  });

  it("возвращает 200 и список болезней, когда БД вернула строки", async () => {
    dbQuery.mockResolvedValueOnce({
      rows: [
        { id: 1, title: "Грипп" },
        { id: 2, title: "ОРВИ" },
      ],
    });

    const res = await request(app).get("/api/disease");

    expect(dbQuery).toHaveBeenCalledTimes(1);
    expect(dbQuery).toHaveBeenCalledWith("select * from disease");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, title: "Грипп" },
      { id: 2, title: "ОРВИ" },
    ]);
  });

  it("возвращает 200 и пустой массив, когда БД вернула пустые rows", async () => {
    dbQuery.mockResolvedValueOnce({
      rows: [],
    });

    const res = await request(app).get("/api/disease");

    expect(dbQuery).toHaveBeenCalledTimes(1);
    expect(dbQuery).toHaveBeenCalledWith("select * from disease");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
