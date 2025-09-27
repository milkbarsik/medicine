import { IUserDto } from "../../dtos/userDto";
import { ITokens } from "../token_service/token_types";


export interface IUserService {
	login: (login: string, password: string) => Promise<IUserReturn>;
	refresh: (refreshToken: string) => Promise<IUserReturn>;
	logOut: (refreshToken: string) => Promise<void>;
	// getUser: (id: number | undefined) => Promise<any>;
}

export interface IUser {
	id: number;
	login: string;
	password: string;
	first_name: string;
	middle_name: string;
	last_name: string;
}

export interface IUserReturn extends ITokens {user: IUserDto}