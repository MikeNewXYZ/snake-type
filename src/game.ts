import { CANVAS_SIZE, PERFECT_FRAME_TIME } from "./constants";
import player from "./player";

type GameLoopFunction = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, deltaTime: number) => void;

let resetCalled = false;

function init(gameLoop: GameLoopFunction) {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.width = CANVAS_SIZE;
	canvas.height = CANVAS_SIZE;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

	window.addEventListener("keyup", ({ code }) => player.playerMovementController(code));

	let deltaTime = 0;
	let lasTimestamp = 0;

	function render(timestamp: number) {
		window.requestAnimationFrame(render);
		deltaTime = (timestamp - lasTimestamp) / PERFECT_FRAME_TIME;
		lasTimestamp = timestamp;

		gameLoop(canvas, context, deltaTime);
	}
	window.requestAnimationFrame(render);
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
