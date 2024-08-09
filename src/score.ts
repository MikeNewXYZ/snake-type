import { DEFAULT_FONT } from "./constants";
import palette from "./palette";

let score = 0;
const increaseScore = () => score++;

function render(context: CanvasRenderingContext2D) {
	context.font = `30px ${DEFAULT_FONT}`;
	context.fillStyle = palette.baseContent;
	context.fillText(`Score: ${score}`, 10, 35);
}

export default {
	score: score,
	increaseScore: increaseScore,
	render: render,
};
