import GameBoard from "@/components/GameBoard";
import TypingArea from "@/components/TypingArea";

export default function HomePage() {
	return (
		<main className="container mx-auto flex h-dvh flex-col">
			<section className="m-auto max-h-96 overflow-hidden p-4">
				<GameBoard />
			</section>

			<section className="flex flex-1 items-center justify-center p-4">
				<TypingArea />
			</section>
		</main>
	);
}
