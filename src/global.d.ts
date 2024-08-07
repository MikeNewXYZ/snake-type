type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type AppGlobal = {
	typed: string;
	direction: string | null;
	foodRect: Rect | null;
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
