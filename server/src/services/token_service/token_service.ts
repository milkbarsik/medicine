import jwt from 'jsonwebtoken';
import db from '../../../db';
import { ITokenServise, IToken, ITokens } from './token_types';
import { IUserDto } from '../../dtos/userDto';

class TokenService implements ITokenServise{

	generateTokens (payload: IUserDto): ITokens {

		const aSecret = process.env.JWT_ACCESS_SECRET;
		const rSecret = process.env.JWT_REFRESH_SECRET;
		
		if (!aSecret || !rSecret) {
			throw new Error('JWT___SECRET is not defined in environment variables');
		}

		const accessToken = jwt.sign(payload, aSecret, {expiresIn: '15m'});
		const refreshToken = jwt.sign(payload, rSecret, {expiresIn: '1d'});

		return {
			accessToken,
			refreshToken
		}
	}

	validateAccessToken (token: string): IUserDto | null {
		try {
			const aSecret = process.env.JWT_ACCESS_SECRET;
			if (!aSecret) {
				throw new Error('JWT___SECRET is not defined in environment variables');
			}

			const userData = jwt.verify(token, aSecret) as IUserDto;
			return userData;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	validateRefreshToken (token: string): IUserDto | null {
		try {

			const rSecret = process.env.JWT_REFRESH_SECRET;
			if (!rSecret) {
				throw new Error('JWT___SECRET is not defined in environment variables');
			}
			const userData = jwt.verify(token, rSecret) as IUserDto;
			return userData;

		} catch (e) {
			console.log(e);
			return null;
		}
	}

	async saveToken (userId: number, refreshToken: string): Promise<void> {
		const tokenData = await db.query('select * from tokens where doctor_id = $1', [userId]);

		if (tokenData.rows.length > 0) {
			await db.query("UPDATE tokens SET refresh_token = $1 WHERE doctor_id = $2", [
					refreshToken,
					userId,
			]);
		} else {
			await db.query("INSERT INTO tokens (doctor_id, refresh_token) VALUES ($1, $2)", [
				userId,
				refreshToken,
			]);
		}
	}

	async removeToken (refreshToken: string): Promise<void> {
		await db.query('delete from tokens where refresh_token = $1', [refreshToken]);
	}

	async findToken (refreshToken: string): Promise<IToken> {
		const tokenData = await db.query<IToken>('select refresh_token from tokens where refresh_token = $1', [refreshToken]);
		return tokenData.rows[0];
	}
}

export const tokenService = new TokenService();