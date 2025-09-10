import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
	authResponse,
	authCurrentResponse,
	Workout,
	Params,
} from "./types";

export const BASE_URL = "http://localhost:3000";

axios.defaults.baseURL = BASE_URL;

// Auth API

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

// Workouts API

export const fetchAllWorkouts = (token: string): Promise<AxiosResponse<{workouts: Workout[]}>> => {
	return axios.get("/workouts/", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export const addWorkout = (token: string, data: { date: string; exercises: { name: string; reps: string; weight: string }[] }): Promise<AxiosResponse<Workout>> => {
	return axios.post("/workouts/add", data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export const deleteWorkout = (token: string, data: { id: string }): Promise<AxiosResponse<{ message: string }>> => {
	return axios.delete(`/workouts/delete`, {
		data,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}


// Params API

export const fetchAllParams = (token: string): Promise<AxiosResponse<{params: Params[]}>> => {
	return axios.get("/params/", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export const addParam = (token: string, data: { type: string; value: string }): Promise<AxiosResponse<Params>> => {
	return axios.patch("/params/add", data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}