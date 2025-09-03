export type authResponse = {
	token: string;
	user: {
		username: string;
	};
};

export type authCurrentResponse = {
	username: string;
}