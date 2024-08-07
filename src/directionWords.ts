import palette from "./palette";
import WORDS from "./words";

const ALL_DIRECTIONS: Array<keyof DirectionWords> = ["up", "down", "left", "right"];

let currentDirectionWords: DirectionWords | null = null;
let validDirections: string[] = ALL_DIRECTIONS;

newDirectionWords();

export default function directionWords(context: CanvasRenderingContext2D) {
	if (!currentDirectionWords) return;

	compareTypedToWords();
	renderText(context);
}

function renderText(context: CanvasRenderingContext2D) {
	if (!currentDirectionWords) return;

	// Define text font
	context.font = "bold 30px Roboto";

	for (let i = 0; i < ALL_DIRECTIONS.length; i++) {
		const directionKey: keyof DirectionWords = ALL_DIRECTIONS[i];
		const directionText = directionKey.toUpperCase();
		const directionWord = currentDirectionWords[directionKey];
		const isValid = validDirections.includes(directionKey);

		const text = {
			direction: `${directionText} - `,
			front: directionWord.substring(0, window.appGlobal.typed.length),
			back: directionWord.substring(window.appGlobal.typed.length, directionWord.length),
		};

		const initialTextSpacingX = 10;
		const textSpacingX = {
			direction: context.measureText(text.direction).width,
			front: context.measureText(text.front).width,
			back: context.measureText(text.back).width,
		};
		const textSpacingY = 40 * (i + 1);

		if (isValid) {
			// Direction text
			context.fillStyle = palette.baseContent;
			context.fillText(text.direction, initialTextSpacingX, textSpacingY);

			// Front text
			context.fillStyle = palette.success;
			context.fillText(text.front, initialTextSpacingX + textSpacingX.direction, textSpacingY);

			// Back text
			context.fillStyle = palette.baseContent;
			context.fillText(
				text.back,
				initialTextSpacingX + textSpacingX.direction + textSpacingX.front,
				textSpacingY,
			);
		} else {
			// Invalid text
			context.fillStyle = palette.error;
			context.fillText(text.direction + directionWord, initialTextSpacingX, textSpacingY);
		}
	}
}

function newDirectionWords() {
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

	currentDirectionWords = {
		up: wordPicks[0],
		down: wordPicks[1],
		left: wordPicks[2],
		right: wordPicks[3],
	};
}

function compareTypedToWords() {
	if (!currentDirectionWords) return;

	function reset() {
		window.appGlobal.typed = "";
		validDirections = ALL_DIRECTIONS;
	}

	const typedLength: number = window.appGlobal.typed.length;
	let newValidDirection: string[] = [];

	for (const [direction, word] of Object.entries(currentDirectionWords)) {
		const compare: string = word.substring(0, typedLength);

		if (compare !== window.appGlobal.typed) continue;

		newValidDirection.push(direction);

		if (window.appGlobal.typed === word) {
			reset();
			newDirectionWords();
			window.appGlobal.direction = direction;
			return;
		}
	}

	if (newValidDirection.length <= 0) {
		reset();
		return;
	}

	validDirections = newValidDirection;
}
