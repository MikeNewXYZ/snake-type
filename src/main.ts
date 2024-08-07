import { PERFECT_FRAME_TIME } from "./constants";
import directionWords from "./directionWords";
import food from "./food";
import background from "./background";
import player from "./player";

window.appGlobal = {
	typed: "",
	direction: "",
	playerRect: null,
	playerVelocity: { x: 0, y: 0 },
	playerVelocityMultiplier: 1,
	foodRect: null,
};

function init(): void {
	const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	const context = <CanvasRenderingContext2D>canvas.getContext("2d");

	player.placeRandom(canvas);
	food.placeRandom(canvas);

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
	const foodRect = window.appGlobal.foodRect;

	background.render(canvas, context);

	player.setVelocity();
	player.render(context, deltaTime);

	if (!foodRect) throw new Error("foodRect is NULL");
	food.render(context, foodRect);

	directionWords(context);
}
