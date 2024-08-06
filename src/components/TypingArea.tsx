import { useContext } from "react";
import { DirectionWords } from "@/lib/types";
import { DirectionWordsContext } from "@/contexts/DirectionWordsContext";
import {
	ArrowFatUp,
	ArrowFatDown,
	ArrowFatLeft,
	ArrowFatRight,
} from "@phosphor-icons/react/dist/ssr";
import DirectionWord from "./DirectionWord";

type TypingAreaProps = {
	directionWords: DirectionWords;
	validDirections: string[];
	typedLength: number;
};

export default function TypingArea() {
	const { directionWords, validDirections, typedLength } = useContext(DirectionWordsContext);
	if (!directionWords) return null;

	const isUpValid = validDirections.includes("up");
	const isDownValid = validDirections.includes("down");
	const isLeftValid = validDirections.includes("left");
	const isRightValid = validDirections.includes("right");

	return (
		<div className="grid h-full w-full max-w-[30rem] grid-cols-3 grid-rows-3">
			{/* UP ARROW */}
			<div className="relative col-start-2 row-start-1">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<DirectionWord
						directionWord={directionWords["up"]}
						typedLength={typedLength}
						isValid={isUpValid}
					/>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatUp className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>

			{/* DOWN ARROW */}
			<div className="relative col-start-2 row-start-3">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<DirectionWord
						directionWord={directionWords["down"]}
						typedLength={typedLength}
						isValid={isDownValid}
					/>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatDown className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>

			{/* LEFT ARROW */}
			<div className="relative col-start-1 row-start-2">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<DirectionWord
						directionWord={directionWords["left"]}
						typedLength={typedLength}
						isValid={isLeftValid}
					/>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatLeft className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>

			{/* RIGHT ARROW */}
			<div className="relative col-start-3 row-start-2">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<DirectionWord
						directionWord={directionWords["right"]}
						typedLength={typedLength}
						isValid={isRightValid}
					/>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatRight className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>
		</div>
	);
}
