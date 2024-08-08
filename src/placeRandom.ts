import { CANVAS_SIZE } from "./constants";

export default function placeRandom(size: number): Rect {
	const x = Math.floor(Math.random() * (CANVAS_SIZE - size));
	const y = Math.floor(Math.random() * (CANVAS_SIZE - size));

	return { x: x, y: y, width: size, height: size };
}
