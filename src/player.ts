import {
	PLAYER_WIDTH,
	PLAYER_HEIGHT,
	PLAYER_SPAWN_BOUNDS_INNER,
	PLAYER_SPAWN_BOUNDS_OUTER,
} from "./constants";
import palette from "./palette";

function placeRandom(canvas: HTMLCanvasElement) {
	const spawnBounds = {
		min: {
			x: canvas.width * PLAYER_SPAWN_BOUNDS_INNER - PLAYER_WIDTH,
			y: canvas.height * PLAYER_SPAWN_BOUNDS_INNER - PLAYER_HEIGHT,
		},
		max: {
			x: canvas.width * PLAYER_SPAWN_BOUNDS_OUTER - PLAYER_WIDTH,
			y: canvas.height * PLAYER_SPAWN_BOUNDS_OUTER - PLAYER_HEIGHT,
		},
	};

	window.appGlobal.playerRect = {
		x: Math.floor(spawnBounds.min.x + Math.random() * (spawnBounds.max.x - spawnBounds.min.x)),
		y: Math.floor(spawnBounds.min.y + Math.random() * (spawnBounds.max.y - spawnBounds.min.y)),
		width: PLAYER_WIDTH,
		height: PLAYER_HEIGHT,
	};
}

function render(context: CanvasRenderingContext2D, playerRect: Rect) {
	context.fillStyle = palette.primary;
	context.fillRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height);
}

export default {
	placeRandom,
	render,
};
