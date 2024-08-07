import { PERFECT_FRAME_TIME } from "./constants";
import directionWords from "./directionWords";
import palette from "./palette";

window.appGlobal = {
	typed: "",
	direction: "",
};

function init(): void {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

	window.addEventListener("keypress", ({ key }) => (window.appGlobal.typed += key));

	let deltaTime: number = 0;
	let lasTimestamp: number = 0;

	function render(timestamp: number): void {
		window.requestAnimationFrame(render);
		deltaTime = (timestamp - lasTimestamp) / PERFECT_FRAME_TIME;
		lasTimestamp = timestamp;

		update(canvas, context, deltaTime);
	}
	window.requestAnimationFrame(render);
}
init();

function update(
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	deltaTime: number,
): void {
	// Background color
	context.fillStyle = palette.base100;
	context.fillRect(0, 0, canvas.width, canvas.height);

	directionWords(context);
}
