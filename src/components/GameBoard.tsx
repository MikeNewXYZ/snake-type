"use client";
import { useEffect, useRef, useContext } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/constants";
import useThemeColors, { ThemeColors } from "@/hooks/useThemeColors";
import { DirectionWordsContext } from "@/contexts/DirectionWordsContext";

export default function GameBoard() {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const playerPosition = useRef({ x: 300, y: 300 });
	const playerVelocity = useRef({ x: 0, y: 0 });
	const themeColors = useThemeColors();
	const { direction } = useContext(DirectionWordsContext);

	const playerController = () => {
		switch (direction) {
			case "up":
				playerVelocity.current = { x: 0, y: -1 };
				break;
			case "down":
				playerVelocity.current = { x: 0, y: 1 };
				break;
			case "left":
				playerVelocity.current = { x: -1, y: 0 };
				break;
			case "right":
				playerVelocity.current = { x: 1, y: 0 };
				break;

			default:
				break;
		}
	};

	const update = (
		deltaTime: number,
		canvas: HTMLCanvasElement,
		context: CanvasRenderingContext2D,
		themeColors: ThemeColors,
	) => {
		context.fillStyle = themeColors.base100;
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "red";
		playerPosition.current = {
			x: playerPosition.current.x + playerVelocity.current.x * deltaTime * 100,
			y: playerPosition.current.y + playerVelocity.current.y * deltaTime * 100,
		};
		context.fillRect(playerPosition.current.x, playerPosition.current.y, 100, 100);
	};

	const init = () => {
		if (!themeColors) return;

		const canvas = canvasRef.current;
		canvas.width = CANVAS_WIDTH;
		canvas.height = CANVAS_HEIGHT;
		const context = canvas.getContext("2d")!;

		let deltaTime: number = 0;
		let lastTimestamp: number = 0;

		const render = (timestamp: number) => {
			requestAnimationFrame(render);
			deltaTime = (timestamp - lastTimestamp) / (1000 / 2);
			lastTimestamp = timestamp;
			update(deltaTime, canvas, context, themeColors);
		};

		requestAnimationFrame(render);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => init(), [themeColors]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => playerController(), [direction]);

	return (
		<div className="flex aspect-video items-center justify-center portrait:w-full landscape:h-full">
			<canvas
				ref={canvasRef}
				className="max-h-full max-w-full border-4 border-neutral object-contain shadow-md"
			></canvas>
		</div>
	);
}
