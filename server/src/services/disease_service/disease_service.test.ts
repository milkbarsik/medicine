import { describe, it, expect, vi, beforeEach } from "vitest";

// СНАЧАЛА мок db — ТОЛЬКО фабрика, без внешних переменных
vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    default: { query },
  };
});

// потом уже импортируем то, что тестируем
import db from "../../../db";
import DiseaseService from "./disease_service";

type DbMock = ReturnType<typeof vi.fn>;

describe("DiseaseService", () => {
  const dbQuery = db.query as unknown as DbMock;

  beforeEach(() => {
    dbQuery.mockReset();
  });

  it("getDisease делает SELECT и возвращает массив болезней", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 1, title: "Грипп" }],
    });

    const res = await DiseaseService.getDisease();

    expect(dbQuery).toHaveBeenCalledWith("select * from disease");
    expect(res).toEqual([{ id: 1, title: "Грипп" }]);
  });

	it("getDisease пробрасывает ошибку из db.query", async () => {
		const err = new Error("db down");
		dbQuery.mockRejectedValue(err);

		await expect(DiseaseService.getDisease())
			.rejects.toThrow("Disease not found"); // ← сообщение, которое реально кидает сервис
	});

  it("postDisease делает INSERT и возвращает созданную болезнь", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 10, title: "ОРВИ" }],
    });

    const payload = {id: 10, title: "ОРВИ" };
    const res = await DiseaseService.postDisease(payload);

    expect(dbQuery).toHaveBeenCalledWith(
      "insert into disease (title) values ($1) returning *",
      [payload.title]
    );
    expect(res).toEqual({ id: 10, title: "ОРВИ" });
  });

	it("postDisease пробрасывает ошибку из db.query", async () => {
		const err = new Error("insert error");
		dbQuery.mockRejectedValue(err);

		await expect(
			DiseaseService.postDisease({ id: 10, title: "ОРВИ" })
		).rejects.toThrow("Disease not created"); // ← сообщение из реализации
	});
});
