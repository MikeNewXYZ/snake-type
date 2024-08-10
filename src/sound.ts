import direction_change from "./assets/direction_change.wav";
import eat_food from "./assets/eat_food.wav";
import game_over from "./assets/game_over.wav";
import invalid_key from "./assets/invalid_key.wav";
import key_press from "./assets/key_press.wav";

const directionChange = new Audio(direction_change);
const eatFood = new Audio(eat_food);
const gameOver = new Audio(game_over);
const invalidKey = new Audio(invalid_key);
const keyPress = new Audio(key_press);

export default {
	directionChange: directionChange,
	eatFood: eatFood,
	gameOver: gameOver,
	invalidKey: invalidKey,
	keyPress: keyPress,
};
