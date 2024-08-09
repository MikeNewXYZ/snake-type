import { ALL_DIRECTIONS, DEFAULT_FONT, DIRECTION_TEXT_INITIAL_Y, DIRECTION_TEXT_SPACING_Y } from "./constants";
import palette from "./palette";
import WORDS from "./words";

let currentDirectionWords: DirectionWords = newDirectionWords();
let validDirections: string[] = ALL_DIRECTIONS;
let disabledDirection: string | null = null;
let currentDirection: string | null = null;
let typed: string = "";

const setTyped = (newValue: string) => (typed += newValue.toLowerCase());
const setDisabledDirection = (newValue: string) => (disabledDirection = newValue.toLowerCase());

const getCurrentDirection = () => currentDirection;

function newDirectionWords(): DirectionWords {
	let wordPicks: string[] = [];

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

	return {
		up: wordPicks[0],
		down: wordPicks[1],
		left: wordPicks[2],
		right: wordPicks[3],
	};
}

function compareTypedToWords() {
	function reset() {
		typed = "";
		validDirections = ALL_DIRECTIONS;
	}

	const typedLength = typed.length;
	let newValidDirection: string[] = [];

	for (const [direction, word] of Object.entries(currentDirectionWords)) {
		const compare = word.substring(0, typedLength);

		if (compare !== typed) continue;

		newValidDirection.push(direction);

		if (typed === word) {
			reset();
			currentDirectionWords = newDirectionWords();
			currentDirection = direction;
			return;
		}
	}

	if (newValidDirection.length <= 0) {
		reset();
		return;
	}

	validDirections = newValidDirection;
}

function render(context: CanvasRenderingContext2D) {
	context.font = `25px ${DEFAULT_FONT}`;
	context.textBaseline = "top";
	context.fillStyle = palette.baseContent;

	let directionIndex = 0;

	for (let i = 0; i < ALL_DIRECTIONS.length; i++) {
		const directionKey: keyof DirectionWords = ALL_DIRECTIONS[i];
		const textSpacingY = DIRECTION_TEXT_INITIAL_Y + DIRECTION_TEXT_SPACING_Y * directionIndex;
		const directionWord = currentDirectionWords[directionKey];
		const isValid = validDirections.includes(directionKey);
		const isDisabledDirection = disabledDirection === directionKey;

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

		if (isDisabledDirection) continue;

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
	currentDirection: currentDirection,
	typed: typed,
	setTyped: setTyped,
	setDisabledDirection: setDisabledDirection,
	getCurrentDirection: getCurrentDirection,
	compareTypedToWords: compareTypedToWords,
	render: render,
};
