import { DEFAULT_FONT } from "./constants";
import palette from "./palette";

let score = 0;
const increaseScore = () => score++;

function render(context: CanvasRenderingContext2D) {
	context.font = `bold 30px ${DEFAULT_FONT}`;
	context.textBaseline = "top";
	context.fillStyle = palette.baseContent;
	context.fillText(`Score: ${score}`, 8, 10);
}

export default {
	score: score,
	increaseScore: increaseScore,
	render: render,
};
