import axios, { type AxiosResponse } from "axios";
import type { IUserData } from "./types";

export const $authClient = axios.create({
	baseURL: 'http://localhost:5050/api/',
	withCredentials: true
})

$authClient.interceptors.request.use( async (config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config;
})

$authClient.interceptors.response.use( (config) => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response: AxiosResponse<IUserData> = await axios.get(`http://localhost:5050/api/refresh`, {withCredentials: true});
			localStorage.setItem('token', response.data.accessToken);
			return $authClient.request(originalRequest);
		} catch (e) {
			console.log(e);
		}
	}
	throw error;
})