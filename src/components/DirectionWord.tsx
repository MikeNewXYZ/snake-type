import { twMerge } from "tailwind-merge";

type DirectionWordProps = {
	directionWord: string;
	typedLength: number;
	isValid: boolean;
};

export default function DirectionWord({ directionWord, typedLength, isValid }: DirectionWordProps) {
	const frontPart = directionWord.substring(0, typedLength);
	const lastPart = directionWord.substring(typedLength, directionWord.length);

	const WordValid = () => (
		<>
			<span className="opacity-50">{frontPart}</span>
			<span>{lastPart}</span>
		</>
	);

	const WordInvalid = () => <span>{directionWord}</span>;

	return (
		<p
			className={twMerge(
				"pb-1 text-4xl font-semibold text-neutral",
				isValid ? "opacity-100" : "opacity-25",
			)}
		>
			{isValid ? <WordValid /> : <WordInvalid />}
		</p>
	);
}
