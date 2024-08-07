type AppGlobal = {
	typed: string;
	direction: string | null;
};

interface Window {
	appGlobal: AppGlobal;
}

type DirectionWords = {
	up: string;
	down: string;
	left: string;
	right: string;
};
