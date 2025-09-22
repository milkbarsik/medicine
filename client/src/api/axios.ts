import axios from "axios";

export const $authClient = axios.create({
	baseURL: 'http://localhost:5050/api/',
})

$authClient.interceptors.request.use( async (config) => {
	return config;
})