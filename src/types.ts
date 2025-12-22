// Exercise
export type WorkoutSetType = {
	name: string;
	reps: string;
	weight: string;
	supersetGroup?: string;
};

export type WorkoutSetPropertyType = "name" | "reps" | "weight";

//Workout
export type WorkoutCardType = {
	_id: string;
	date: string;
	exercises: WorkoutSetType[];
};

// Params
export type TrainingOptionsType = {
	_id: string;
	owner: string;
	exercises: string[];
	reps: string[];
	weights: string[];
};

export type TrainingOptionsPropertyType = "exercises" | "reps" | "weights";

export type addWorkoutData = {
	date: string;
	exercises: { name: string; reps: string; weight: string }[];
};