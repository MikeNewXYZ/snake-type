export default function calcSquareCanvasSize(
	containerWidth: number,
	containerHeight: number,
): number {
	if (containerWidth > containerHeight) {
		return containerHeight;
	}

	if (containerWidth < containerHeight) {
		return containerWidth;
	}

	return containerWidth;
}
