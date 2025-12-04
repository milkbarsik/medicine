// src/services/auth_service/auth_service.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// ----- mock db -----
vi.mock("../../../db", () => {
  const query = vi.fn();
  return {
    default: { query },
  };
});

// ----- mock bcrypt (ВАЖНО: с default) -----
vi.mock("bcrypt", () => {
  const compare = vi.fn();
  const hash = vi.fn();
  return {
    default: { compare, hash },
  };
});

// ----- mock tokenService как именованный экспорт -----
vi.mock("../token_service/token_service", () => {
  const tokenService = {
    generateTokens: vi.fn(),
    saveToken: vi.fn(),
    removeToken: vi.fn(),
  };
  return { tokenService };
});

// ----- импорты после моков -----
import db from "../../../db";
import bcrypt from "bcrypt";
import { tokenService } from "../token_service/token_service";
import { userService } from "./auth_service";
import ApiError from "../../exceptions/apiError";

type DbMock = ReturnType<typeof vi.fn>;
const dbQuery = db.query as unknown as DbMock;
const bcryptCompare = bcrypt.compare as unknown as DbMock;

describe("AuthService.login", () => {
  beforeEach(() => {
    dbQuery.mockReset();
    bcryptCompare.mockReset();
    (tokenService.generateTokens as DbMock).mockReset();
    (tokenService.saveToken as DbMock).mockReset();
  });

  it("успешный логин: находит пользователя, сравнивает пароль, генерирует токены", async () => {
    dbQuery.mockResolvedValue({
      rows: [
        {
          id: 1,
          login: "doc",
          password: "hashed",
          role: "doctor",
        },
      ],
    });

    bcryptCompare.mockResolvedValue(true);

    (tokenService.generateTokens as DbMock).mockReturnValue({
      accessToken: "access",
      refreshToken: "refresh",
    });

    const result = await userService.login("doc", "1234");

    expect(dbQuery).toHaveBeenCalledWith(
      "select * from doctors where login = $1",
      ["doc"],
    );
    expect(bcryptCompare).toHaveBeenCalledWith("1234", "hashed");
    expect(tokenService.generateTokens).toHaveBeenCalledTimes(1);
    expect(tokenService.saveToken).toHaveBeenCalledWith(1, "refresh");

    expect(result).toEqual(
      expect.objectContaining({
        accessToken: "access",
        refreshToken: "refresh",
        user: expect.objectContaining({
          id: 1,
          login: "doc",
        }),
      }),
    );
  });

  it("бросает ApiError, если пользователь не найден", async () => {
    dbQuery.mockResolvedValue({ rows: [] });

    await expect(
      userService.login("unknown", "1234"),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("бросает ApiError, если пароль неверный", async () => {
    dbQuery.mockResolvedValue({
      rows: [{ id: 1, login: "doc", password: "hashed", role: "doctor" }],
    });

    bcryptCompare.mockResolvedValue(false);

    await expect(
      userService.login("doc", "wrong"),
    ).rejects.toBeInstanceOf(ApiError);
  });
});

describe("AuthService.logOut", () => {
  it("делегирует удаление токена tokenService.removeToken", async () => {
    // если в логике логАута ничего не возвращается,
    // нам не важно, что возвращает removeToken
    (tokenService.removeToken as DbMock).mockResolvedValue(undefined);

    const res = await userService.logOut("refresh-token");

    expect(tokenService.removeToken).toHaveBeenCalledWith("refresh-token");
    expect(res).toBeUndefined(); // <-- вот тут меняем ожидание
  });
});
