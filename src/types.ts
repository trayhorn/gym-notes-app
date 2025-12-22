
export type WorkoutSetType = {
	name: string;
	reps: string;
	weight: string;
	supersetGroup?: string;
};

export type WorkoutSetPropertyType = "name" | "reps" | "weight";


export type WorkoutCardType = {
	_id: string;
	date: string;
	exercises: WorkoutSetType[];
};


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

export type deleteParamData = {
	type: TrainingOptionsPropertyType;
	item: string;
}