"use client";
import { createContext, useEffect, useState, useRef } from "react";
import { DirectionWords } from "@/lib/types";
import WORDS from "@/lib/words";

type DirectionWordsContextValue = {
	typedLength: number;
	validDirections: string[];
	directionWords: DirectionWords | null;
	direction: string | null;
};

type DirectionWordsProviderProps = {
	children: React.ReactNode;
};

export const DirectionWordsContext = createContext<DirectionWordsContextValue>({
	typedLength: 0,
	validDirections: ["up", "down", "left", "right"],
	directionWords: null,
	direction: null,
});

export function DirectionWordsProvider({ children }: DirectionWordsProviderProps) {
	const typed = useRef<string>("");
	const [typedLength, setTypedLength] = useState<number>(0);
	const [validDirections, setValidDirections] = useState<string[]>(["up", "down", "left", "right"]);
	const [directionWords, setDirectionWords] = useState<DirectionWords | null>(null);
	const [direction, setDirection] = useState<string | null>(null);

	const newDirectionWords = () => {
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

		const words: DirectionWords = {
			up: wordPicks[0],
			down: wordPicks[1],
			left: wordPicks[2],
			right: wordPicks[3],
		};

		setDirectionWords(words);
	};

	const resetStates = () => {
		typed.current = "";
		setValidDirections(["up", "down", "left", "right"]);
		setTypedLength(0);
	};

	const compareTypedToWords = (event: KeyboardEvent) => {
		if (!directionWords) return;

		typed.current += event.key;

		const typedLength: number = typed.current.length;
		let newValidDirections: string[] = [];

		for (const [direction, word] of Object.entries(directionWords)) {
			const compare: string = word.substring(0, typedLength);

			if (compare !== typed.current) continue;

			newValidDirections.push(direction);

			if (typed.current === word) {
				resetStates();
				newDirectionWords();
				setDirection(direction);
				return;
			}
		}

		if (newValidDirections.length <= 0) {
			resetStates();
			console.log("looser");
			return;
		}

		setValidDirections(newValidDirections);
		setTypedLength(typedLength);
	};

	useEffect(() => newDirectionWords(), []);

	useEffect(() => {
		if (!directionWords) return;

		window.addEventListener("keypress", compareTypedToWords);

		return () => {
			window.removeEventListener("keypress", compareTypedToWords);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [directionWords]);

	return (
		<DirectionWordsContext.Provider
			value={{ typedLength, validDirections, directionWords, direction }}
		>
			{children}
		</DirectionWordsContext.Provider>
	);
}
