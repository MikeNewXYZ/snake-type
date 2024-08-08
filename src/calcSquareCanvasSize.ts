type CanvasSize = {
	width: number;
	height: number;
};

export default function calcSquareCanvasSize(
	containerWidth: number,
	containerHeight: number,
): CanvasSize {
	if (containerWidth > containerHeight) {
		return {
			width: containerHeight,
			height: containerHeight,
		};
	}

	if (containerWidth < containerHeight) {
		return {
			width: containerWidth,
			height: containerWidth,
		};
	}

	return {
		width: containerWidth,
		height: containerHeight,
	};
}
