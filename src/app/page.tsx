"use client";
import { useEffect, useState } from "react";
import { Words } from "@/lib/types";
import WORDS from "@/lib/words";
import GameBoard from "@/components/GameBoard";
import TypingArea from "@/components/TypingArea";

export default function HomePage() {
	const [words, setWords] = useState<Words | null>(null);

	useEffect(() => {
		const wordPicked: string[] = pickWords();

		const words: Words = {
			up: wordPicked[0].split("").map((letter) => ({ value: letter, isTyped: false })),
			down: wordPicked[1].split("").map((letter) => ({ value: letter, isTyped: false })),
			left: wordPicked[2].split("").map((letter) => ({ value: letter, isTyped: false })),
			right: wordPicked[3].split("").map((letter) => ({ value: letter, isTyped: false })),
		};

		setWords(words);
	}, []);

	function pickWords(): string[] {
		let wordPicks: string[] = [];

		function pick() {
			const word: string = WORDS[Math.floor(Math.random() * WORDS.length)];

			if (wordPicks.filter((wordPick) => wordPick === word).length > 0) {
				pick();
				return;
			}

			if (wordPicks.length >= 4) return;

			wordPicks.push(word);
			pick();
		}
		pick();

		return wordPicks;
	}

	return (
		<main className="container mx-auto flex h-dvh flex-col">
			<section className="m-auto max-h-96 overflow-hidden p-4">
				<GameBoard />
			</section>

			<section className="flex flex-1 items-center justify-center p-4">
				{words && <TypingArea words={words} />}
			</section>
		</main>
	);
}
