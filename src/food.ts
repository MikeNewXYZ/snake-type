import { FOOD_WIDTH, FOOD_HEIGHT } from "./constants";
import palette from "./palette";

function placeRandom(canvas: HTMLCanvasElement) {
	window.appGlobal.foodRect = {
		x: Math.floor(Math.random() * (canvas.width - FOOD_WIDTH)),
		y: Math.floor(Math.random() * (canvas.height - FOOD_HEIGHT)),
		width: FOOD_WIDTH,
		height: FOOD_HEIGHT,
	};
}

function render(context: CanvasRenderingContext2D, foodRect: Rect) {
	context.fillStyle = palette.accent;
	context.fillRect(foodRect.x, foodRect.y, foodRect.width, foodRect.height);
}

export default {
	placeRandom,
	render,
};
