export type authResponse = {
	token: string;
	user: {
		username: string;
	};
};

export type authCurrentResponse = {
	username: string;
}


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