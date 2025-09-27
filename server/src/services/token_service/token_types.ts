import { IUserDto } from "../../dtos/userDto";

	export interface ITokens {
		accessToken: string;
		refreshToken: string;
	}

	export interface IToken {
		token: string
	}

	export interface ITokenServise {
		generateTokens: (payload: IUserDto) => ITokens;
		saveToken: (userId: number, refreshToken: string) => Promise<void>;
		removeToken: (refreshToken: string) => Promise<void>;
		validateAccessToken: (token: string) => IUserDto | null;
		validateRefreshToken: (token: string) => IUserDto | null;
		findToken: (refreshToken: string) => Promise<IToken>;
	}