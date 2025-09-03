import axios from "axios";
import type { AxiosResponse } from "axios";
import type { authResponse, authCurrentResponse } from "./types";

export const BASE_URL = "http://localhost:3000";

axios.defaults.baseURL = BASE_URL;

export const registerUser = (data: {
	username: string;
	password: string;
}): Promise<AxiosResponse<authResponse>> => {
	return axios.post("/auth/register", data);
};

export const loginUser = (data: {
	username: string;
	password: string;
}): Promise<AxiosResponse<authResponse>> => {
	return axios.post("/auth/login", data);
};


export const logoutUser = (token: string): Promise<AxiosResponse<authResponse>> => {
	return axios.post("/auth/logout", {}, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const fetchCurrentUser = (
	token: string
): Promise<AxiosResponse<authCurrentResponse>> => {
	return axios.get("/auth/current", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
