import GameBoard from "@/components/GameBoard";

export default function HomePage() {
	return (
		<main className="container mx-auto flex h-dvh flex-col">
			<section className="m-auto flex-1 overflow-hidden p-4">
				<GameBoard />
			</section>

			<section className="flex-1"></section>
		</main>
	);
}
