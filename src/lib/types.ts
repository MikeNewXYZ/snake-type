export type Letters = {
	value: string;
	isTyped: boolean;
};

export type Words = {
	up: Letters[];
	down: Letters[];
	left: Letters[];
	right: Letters[];
};
