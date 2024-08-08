import palette from "./palette";
import calcSquareCanvasSize from "./calcSquareCanvasSize";

const CANVAS_SIZE = calcSquareCanvasSize(window.innerWidth, window.innerHeight);
const BACKGROUND_COLOR = palette.base100;
const PERFECT_FRAME_TIME = 1000 / 10;

function init() {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.width = CANVAS_SIZE;
	canvas.height = CANVAS_SIZE;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

	let deltaTime: number = 0;
	let lasTimestamp: number = 0;

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
	context.fillStyle = BACKGROUND_COLOR;
	context.fillRect(0, 0, canvas.width, canvas.height);
}
