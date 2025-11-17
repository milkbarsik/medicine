import { create } from "zustand";
import { type AxiosResponse } from "axios";
import type { IUserData, TUser } from "../api/types";
import { authUser } from "../api/services";

type Tauth = {
	isAuth: boolean;
	user: TUser | null;
	setAuth: (value: boolean) => void;
	setUser: (user: TUser) => void;
	login: (email: string, password: string) => Promise<IUserData>;
	refresh: () =>Promise<AxiosResponse<IUserData>>;
	logOut: () => Promise<unknown>;
}

export const useAuth = create<Tauth>((set) => ({
	isAuth: false,
	user: null,

	setAuth: (value: boolean) => set((state) => ({...state, isAuth: value})),

	setUser: (user: TUser) => set((state) => ({...state, user: user})),

	async login (username: string, password: string): Promise<IUserData> {
		const res = await authUser.login(username, password);
		set((state) => ({...state, isAuth: true, user: res.user}));
		localStorage.setItem('token', res.accessToken);
		return res;
	},

	async refresh(): Promise<AxiosResponse<IUserData>> {
		const res = await authUser.refresh();
		localStorage.setItem('token', res.data.accessToken);
		return res;
  },

  async logOut(): Promise<void> {
		await authUser.logOut();
		localStorage.removeItem('token');
		set(() => ({isAuth: false, user: null }));
  },
}))