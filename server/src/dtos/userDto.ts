import { IUser } from "../services/auth_service/auth_type";

export interface IUserDto {
	id: number;
	login: string;
	first_name: string;
	middle_name: string;
	last_name: string;
}

export default class UserDto implements IUserDto {
	id: number;
	login: string;
	first_name: string;
	middle_name: string;
	last_name: string;

	constructor (model: IUser) {
		this.id = model.id;
		this.login = model.login;
		this.first_name = model.first_name;
		this.middle_name = model.middle_name;
		this.last_name = model.last_name;
	};
}