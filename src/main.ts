import { PERFECT_FRAME_TIME } from "./constants";

function init(): void {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

	let deltaTime: number = 0;
	let lasTimestamp: number = 0;

	function render(timestamp: number): void {
		window.requestAnimationFrame(render);
		deltaTime = (timestamp - lasTimestamp) / PERFECT_FRAME_TIME;
		lasTimestamp = timestamp;

		update(context, deltaTime);
	}
	window.requestAnimationFrame(render);
}
init();

function update(context: CanvasRenderingContext2D, deltaTime: number): void {
	console.log(deltaTime);
}
