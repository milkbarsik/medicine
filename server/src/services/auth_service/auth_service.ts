import db from "../../../db";
import UserDto from "../../dtos/userDto";
import ApiError from "../../exceptions/apiError";
import bcrypt from 'bcrypt';
import { IUser, IUserReturn, IUserService } from "./auth_type";
import { tokenService } from "../token_service/token_service";

class UserService implements IUserService {

	async login (login: string, password: string): Promise<IUserReturn> {
		console.log(await bcrypt.hash(password, 3));
		const user = (await db.query<IUser>('select * from doctors where login = $1', [login])).rows[0];
		if (!user) {
			throw ApiError.incorrectLogin();
		}
		const isPasswordEquals = await bcrypt.compare(password, user.password);

		if (password !== user.password && !isPasswordEquals) {
			throw ApiError.incorrectLogin();
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({...userDto});

		await tokenService.saveToken(user.id, tokens.refreshToken);

		return {...tokens, user: userDto};
	}

	async refresh (refreshToken: string): Promise<IUserReturn> {
		if (!refreshToken) {
			throw ApiError.unauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);

		if(!userData || !tokenFromDb) {
			throw ApiError.unauthorizedError();
		}

		const user = (await db.query<IUser>('select * from doctors where id = $1', [userData.id])).rows[0];

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({...userDto});

		await tokenService.saveToken(user.id, tokens.refreshToken);

		return {...tokens, user: userDto};
	}

	async logOut (refreshToken: string): Promise<void> {
		await tokenService.removeToken(refreshToken);
	}

	// async getUser (id: number | undefined) {
	// 	if (!id) {
	// 		throw ApiError.unauthorizedError();
	// 	}
	// 	const res = await db.query('select id, username from users where id = $1', [id]);
	// 	return res.rows[0];
	// };
}

export const userService = new UserService();