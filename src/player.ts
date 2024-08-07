import {
	PLAYER_WIDTH,
	PLAYER_HEIGHT,
	PLAYER_SPAWN_BOUNDS_INNER,
	PLAYER_SPAWN_BOUNDS_OUTER,
	PLAYER_VELOCITY_INCREMENT,
} from "./constants";
import palette from "./palette";

let prevDirection: string | null = null;

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

function setVelocity() {
	const direction = window.appGlobal.direction;
	let playerVelocity = window.appGlobal.playerVelocity;

	function changeDirection(x: number, y: number) {
		if (prevDirection === direction) return;

		playerVelocity = {
			x: x,
			y: y,
		};

		window.appGlobal.playerVelocity = playerVelocity;
		window.appGlobal.playerVelocityMultiplier += PLAYER_VELOCITY_INCREMENT;

		prevDirection = direction;
	}

	if (direction === "up" && playerVelocity.y !== 1) {
		changeDirection(0, -1);
	} else if (direction === "down" && playerVelocity.y !== -1) {
		changeDirection(0, 1);
	} else if (direction === "left" && playerVelocity.x !== 1) {
		changeDirection(-1, 0);
	} else if (direction === "right" && playerVelocity.x !== -1) {
		changeDirection(1, 0);
	}
}

function render(context: CanvasRenderingContext2D, deltaTime: number) {
	if (!window.appGlobal.playerRect) throw new Error("window.appGlobal.playerRect is NULL");

	const playerVelocityMultiplier = window.appGlobal.playerVelocityMultiplier;
	let playerRect = window.appGlobal.playerRect;
	let playerVelocity = window.appGlobal.playerVelocity;

	window.appGlobal.playerRect.x =
		playerRect.x + playerVelocity.x * deltaTime * PLAYER_WIDTH * playerVelocityMultiplier;
	window.appGlobal.playerRect.y =
		playerRect.y + playerVelocity.y * deltaTime * PLAYER_HEIGHT * playerVelocityMultiplier;

	playerRect = window.appGlobal.playerRect;

	context.fillStyle = palette.primary;
	context.fillRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height);
}

export default {
	placeRandom,
	setVelocity,
	render,
};
