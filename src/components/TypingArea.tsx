import { Words } from "@/lib/types";
import {
	ArrowFatUp,
	ArrowFatDown,
	ArrowFatLeft,
	ArrowFatRight,
} from "@phosphor-icons/react/dist/ssr";

type TypingAreaProps = {
	words: Words;
};

export default function TypingArea({ words }: TypingAreaProps) {
	return (
		<div className="grid h-full w-full max-w-[30rem] grid-cols-3 grid-rows-3">
			{/* UP ARROW */}
			<div className="relative col-start-2 row-start-1">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<p className="pb-1 text-4xl font-semibold text-neutral">
						{words.up.map(({ value }, index) => value)}
					</p>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatUp className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>

			{/* DOWN ARROW */}
			<div className="relative col-start-2 row-start-3">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<p className="pb-1 text-4xl font-semibold text-neutral">
						{words.down.map(({ value }, index) => value)}
					</p>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatDown className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>

			{/* LEFT ARROW */}
			<div className="relative col-start-1 row-start-2">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<p className="pb-1 text-4xl font-semibold text-neutral">
						{words.left.map(({ value }, index) => value)}
					</p>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatLeft className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>

			{/* RIGHT ARROW */}
			<div className="relative col-start-3 row-start-2">
				<div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
					<p className="pb-1 text-4xl font-semibold text-neutral">
						{words.right.map(({ value }, index) => value)}
					</p>
				</div>

				<div className="absolute inset-0 flex h-full w-full items-center justify-center">
					<ArrowFatRight className="text-8xl text-base-100" weight="fill" />
				</div>
			</div>
		</div>
	);
}
