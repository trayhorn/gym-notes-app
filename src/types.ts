export type setType = {
	name: string;
	reps: string;
	weight: string;
};


export type Exercise = {
	name: string;
	reps: string;
	weight: string;
};

export type Workout = {
	_id: string;
	date: string;
	exercises: Exercise[];
};

export type Params = {
	_id: string;
	ownder: string;
	exercises: string[];
	reps: string[];
	weights: string[];
};

export type addWorkoutData = {
	date: string;
	exercises: { name: string; reps: string; weight: string }[];
};