import palette from "./palette";

const PERFECT_FRAME_TIME = 1000 / 60;

const CANVAS_SIZE = window.innerWidth >= window.innerHeight ? window.innerHeight : window.innerWidth;

const PLAYER_SIZE = 50;
const INITIAL_PLAYER_SPEED = 3;
const PLAYER_SPEED_INCREMENT = 0.5;

let playerBody: XY[] = [placeRandom(PLAYER_SIZE)];
let playerDirection: XY = { x: 0, y: 0 };
let playerSpeed = INITIAL_PLAYER_SPEED;

function init() {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.width = CANVAS_SIZE;
	canvas.height = CANVAS_SIZE;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

	window.addEventListener("keyup", ({ code }) => playerMovementController(code));

	let deltaTime = 0;
	let lasTimestamp = 0;

	function render(timestamp: number) {
		window.requestAnimationFrame(render);
		deltaTime = (timestamp - lasTimestamp) / PERFECT_FRAME_TIME;
		lasTimestamp = timestamp;

		update(canvas, context, deltaTime);
	}
	window.requestAnimationFrame(render);
}
init();

function update(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, deltaTime: number) {
	// RENDER BACKGROUND
	context.fillStyle = palette.base100;
	context.fillRect(0, 0, canvas.width, canvas.height);

	playerBody.unshift({
		x: playerBody[0].x + playerDirection.x * playerSpeed * deltaTime,
		y: playerBody[0].y + playerDirection.y * playerSpeed * deltaTime,
	});

	playerBody.pop();

	context.fillStyle = "red";
	for (let i = 0; i < playerBody.length; i++) {
		const bodyPart = playerBody[i];
		context.fillRect(bodyPart.x, bodyPart.y, PLAYER_SIZE, PLAYER_SIZE);
	}
}

function playerMovementController(code: string) {
	let { x, y } = playerDirection;

	if (code == "ArrowUp" && y != 1) {
		x = 0;
		y = -1;
	} else if (code == "ArrowDown" && y != -1) {
		x = 0;
		y = 1;
	} else if (code == "ArrowLeft" && x != 1) {
		x = -1;
		y = 0;
	} else if (code == "ArrowRight" && x != -1) {
		x = 1;
		y = 0;
	}

	playerDirection = { x, y };
}

function placeRandom(size: number): XY {
	const x = Math.floor(Math.random() * (CANVAS_SIZE - size));
	const y = Math.floor(Math.random() * (CANVAS_SIZE - size));

	return { x, y };
}
