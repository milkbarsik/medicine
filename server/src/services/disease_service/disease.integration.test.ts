import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

// 1. Мокаем db ТАК ЖЕ, как в юнит-тестах сервисов
vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    __esModule: true,
    default: { query },
  };
});

// 2. Импортируем db и app после моков
import db from "../../../db";
import { app } from "../../../index";

type DbMock = ReturnType<typeof vi.fn>;
const dbQuery = db.query as unknown as DbMock;

describe("GET /api/disease (integration, with mocked DB)", () => {
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

    // фактическое поведение твоего кода — 200 + []
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
