import { ALL_DIRECTIONS, DEFAULT_FONT, DIRECTION_TEXT_INITIAL_Y, DIRECTION_TEXT_SPACING_Y } from "./constants";
import palette from "./palette";
import sound from "./sound";
import WORDS from "./words";

let validDirections: string[] = ALL_DIRECTIONS;
let currentDirectionWords: DirectionWords = newDirectionWords();
let currentDirection: string | null = null;
let typed: string = "";

const getCurrentDirection = () => currentDirection;

function handleKeyPress(key: string) {
	if (key.length > 1) return;

	typed += key.toLowerCase();

	compareTypedToWords();
}

function compareTypedToWords() {
	let newValidDirection: string[] = [];

	for (const [newDirection, word] of Object.entries(currentDirectionWords)) {
		if (!word) continue;

		const compare = word.substring(0, typed.length);

		if (compare !== typed) continue;

		newValidDirection.push(newDirection);

		if (typed === word) {
			sound.directionChange.play();
			validDirections = ALL_DIRECTIONS;
			currentDirection = newDirection;
			currentDirectionWords = newDirectionWords(currentDirection, newDirection);
			typed = "";

			return;
		}
	}

	if (newValidDirection.length <= 0) {
		sound.invalidKey.play();
		validDirections = ALL_DIRECTIONS;
		typed = "";

		return;
	}

	sound.keyPress.play();
	validDirections = newValidDirection;
}

function newDirectionWords(currentDirection?: string, newDirection?: string): DirectionWords {
	let wordPicks: string[] = [];
	let disabledDirections: string[] = [];

	function pick() {
		const word: string = WORDS[Math.floor(Math.random() * WORDS.length)];

		if (wordPicks.filter((wordPick) => wordPick === word).length > 0) {
			pick();
			return;
		}

		if (wordPicks.length >= ALL_DIRECTIONS.length) return;

		wordPicks.push(word);
		pick();
	}
	pick();

	if (newDirection) disabledDirections.push(newDirection);
	if (currentDirection === "up") disabledDirections.push("down");
	if (currentDirection === "down") disabledDirections.push("up");
	if (currentDirection === "left") disabledDirections.push("right");
	if (currentDirection === "right") disabledDirections.push("left");

	return {
		up: disabledDirections?.includes("up") ? null : wordPicks[0],
		down: disabledDirections?.includes("down") ? null : wordPicks[1],
		left: disabledDirections?.includes("left") ? null : wordPicks[2],
		right: disabledDirections?.includes("right") ? null : wordPicks[3],
	};
}

function render(context: CanvasRenderingContext2D) {
	context.font = `25px ${DEFAULT_FONT}`;
	context.textBaseline = "top";
	context.fillStyle = palette.baseContent;

	let directionIndex = 0;

	for (let i = 0; i < ALL_DIRECTIONS.length; i++) {
		const directionKey: keyof DirectionWords = ALL_DIRECTIONS[i];
		const directionWord = currentDirectionWords[directionKey];
		const isValid = validDirections.includes(directionKey);
		const textSpacingY = DIRECTION_TEXT_INITIAL_Y + DIRECTION_TEXT_SPACING_Y * directionIndex;

		if (!directionWord) continue;

		const text = {
			direction: `${ALL_DIRECTIONS[i].toUpperCase()}:`,
			front: directionWord.substring(0, typed.length),
			back: directionWord.substring(typed.length, directionWord.length),
		};

		const textSpacingX = {
			direction: context.measureText(text.direction).width + 15,
			front: context.measureText(text.front).width,
			back: context.measureText(text.back).width,
		};

		directionIndex++;

		if (isValid) {
			context.fillStyle = palette.baseContent;
			context.fillText(text.direction, 8, textSpacingY);

			context.fillStyle = palette.success;
			context.fillText(text.front, 8 + textSpacingX.direction, textSpacingY);

			context.fillStyle = palette.baseContent;
			context.fillText(text.back, 8 + textSpacingX.direction + textSpacingX.front, textSpacingY);

			continue;
		} else {
			context.fillStyle = palette.error;
			context.fillText(text.direction, 8, textSpacingY);
			context.fillText(directionWord, 8 + textSpacingX.direction, textSpacingY);
		}
	}
}

export default {
	handleKeyPress: handleKeyPress,
	getCurrentDirection: getCurrentDirection,
	render: render,
};
