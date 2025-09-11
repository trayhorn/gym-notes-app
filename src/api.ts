import axios from "axios";
// import type { AxiosResponse } from "axios";
// import type {
// 	authResponse,
// 	authCurrentResponse,
// 	Workout,
// 	Params,
// } from "./types";

import type { addWorkoutData } from "./types";

export const BASE_URL = "http://localhost:3000";

axios.defaults.baseURL = BASE_URL;

const setAuthHeader = (token: string) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const unsetAuthHeader = () => {
	axios.defaults.headers.common.Authorization = "";
};

// Auth API

export const registerUser = async (data: {
	username: string;
	password: string;
}) => {
	const { data: response } = await axios.post("/auth/register", data);
	if (response.token) {
    localStorage.setItem("authToken", response.token);
		setAuthHeader(response.token);
	}

	return response.username;
};

export const loginUser = async (data: {
	username: string;
	password: string;
}) => {
	const { data: response } = await axios.post("/auth/login", data);
	console.log(response);
	if (response.token) {
    localStorage.setItem("authToken", response.token);
		setAuthHeader(response.token);
	}

	return response.username;
};


export const logoutUser = async () => {
	await axios.post("/auth/logout");
	localStorage.removeItem("authToken");
	unsetAuthHeader();
};

export const fetchCurrentUser = async () => {
	setAuthHeader(localStorage.getItem("authToken")!);

	return axios.get("/auth/current");
};

// Workouts API

export const fetchAllWorkouts = () => {
	return axios.get("/workouts/");
}



export const addWorkout = ( data: addWorkoutData) => {
	return axios.post("/workouts/add", data);
}

export const deleteWorkout = ( data: { id: string }) => {
	return axios.delete(`/workouts/delete`, { data });
}


// Params API

export const fetchAllParams = async () => {
	const { data } = await axios.get("/params/");
	return data.params;
}

export const addParam = ( data: { type: string; value: string }) => {
	return axios.patch("/params/add", data);
}