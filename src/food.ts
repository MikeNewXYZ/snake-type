import { FOOD_SIZE } from "./constants";
import placeRandom from "./placeRandom";

let foodRect: Rect = placeRandom(FOOD_SIZE);
const setFoodRect = (newValue: Rect) => (foodRect = newValue);
const getFoodRect = () => foodRect;

function render(context: CanvasRenderingContext2D) {
	context.fillStyle = "green";
	context.fillRect(foodRect.x, foodRect.y, foodRect.width, foodRect.height);
}

export default {
	foodRect: foodRect,
	setFoodRect: setFoodRect,
	getFoodRect: getFoodRect,
	render: render,
};
