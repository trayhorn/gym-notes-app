import axios from "axios";
import type {
	WorkoutCardType,
	TrainingOptionsType,
	TrainingOptionsPropertyType,
} from "./types";

import type { addWorkoutData, addParamData } from "./types";

// const BASE_URL = "http://localhost:3000";

const BASE_URL = "https://gym-notes-app-backend.onrender.com";

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
}): Promise<string> => {
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
}): Promise<string> => {
	const { data: response } = await axios.post("/auth/login", data);
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

	const { data } = await axios.get("/auth/current");
	return data.username;
};

// Workouts API

export const fetchAllWorkouts = async (): Promise<WorkoutCardType[]> => {
	const { data } = await axios.get("/workouts/");
	return data.workouts;
}

export const addWorkout = ( data: addWorkoutData): Promise<{message: string}> => {
	return axios.post("/workouts/add", data);
}

export const deleteWorkout = ( data: { id: string }): Promise<{message: string}> => {
	return axios.delete(`/workouts/delete`, { data });
}


// Params API

export const fetchAllParams = async (): Promise<TrainingOptionsType> => {
	const { data } = await axios.get("/params/");
	return data.params;
}

export const addParam = (data: addParamData) => {
	return axios.patch("/params/add", data);
};

export const deleteParam = (data: {
	type: TrainingOptionsPropertyType;
	item: string;
}) => {
	return axios.delete("/params/delete", { data });
};