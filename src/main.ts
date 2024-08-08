import palette from "./palette";

const PERFECT_FRAME_TIME = 1000 / 10;

const CANVAS_SIZE = window.innerWidth >= window.innerHeight ? window.innerHeight : window.innerWidth;
const TILES_PER_AXIS = 20;
const TILE_SIZE = CANVAS_SIZE / TILES_PER_AXIS;

let foodRect: Rect = placeRandomRect();
let playerRect: Rect = placeRandomRect();

function init() {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.width = CANVAS_SIZE;
	canvas.height = CANVAS_SIZE;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

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

	// RENDER FOOD
	context.fillStyle = "yellow";
	context.fillRect(foodRect.x, foodRect.y, foodRect.width, foodRect.height);

	// RENDER PLAYER
	context.fillStyle = "green";
	context.fillRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height);
}

function placeRandomRect(): Rect {
	const x = Math.floor(Math.random() * TILES_PER_AXIS) * TILE_SIZE;
	const y = Math.floor(Math.random() * TILES_PER_AXIS) * TILE_SIZE;

	return {
		x: x,
		y: y,
		width: TILE_SIZE,
		height: TILE_SIZE,
	};
}
