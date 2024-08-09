import { CANVAS_SIZE, PERFECT_FRAME_TIME } from "./constants";
import directionWords from "./directionWords";

type Update = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, deltaTime: number) => void;

let resetCalled = false;

function init(update: Update) {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.width = CANVAS_SIZE;
	canvas.height = CANVAS_SIZE;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

	window.addEventListener("keypress", ({ key }) => directionWords.setTyped(key));

	let deltaTime = 0;
	let lasTimestamp = 0;

	function gameLoop(timestamp: number) {
		window.requestAnimationFrame(gameLoop);
		deltaTime = (timestamp - lasTimestamp) / PERFECT_FRAME_TIME;
		lasTimestamp = timestamp;

		update(canvas, context, deltaTime);
	}
	window.requestAnimationFrame(gameLoop);
}

function reset() {
	if (resetCalled) return;

	window.alert("GAME OVER!!!");
	window.location.reload();

	resetCalled = true;
}

export default {
	init: init,
	reset: reset,
};
