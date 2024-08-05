"use client";
import useThemeColors from "@/hooks/useThemeColors";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/constants";
import { useEffect, useRef } from "react";

export default function GameBoard() {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const themeColors = useThemeColors();

	useEffect(() => {
		if (!themeColors) return;

		const canvas = canvasRef.current;
		canvas.width = CANVAS_WIDTH;
		canvas.height = CANVAS_HEIGHT;
		const context = canvas.getContext("2d")!;

		context.fillStyle = themeColors.base100;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}, [themeColors]);

	return (
		<div className="flex aspect-video items-center justify-center portrait:w-full landscape:h-full">
			<canvas
				ref={canvasRef}
				className="border-neutral max-h-full max-w-full border-4 object-contain shadow-md"
			></canvas>
		</div>
	);
}
