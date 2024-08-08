import palette from "./palette";

function render(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
	context.fillStyle = palette.base100;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

export default {
	render: render,
};
