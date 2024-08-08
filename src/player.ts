import {
	FOOD_SIZE,
	INITIAL_PLAYER_SPEED_MODIFIER,
	PLAYER_GROWTH_TIME,
	PLAYER_SIZE,
	PLAYER_SPEED_MODIFIER_INCREMENT,
} from "./constants";
import food from "./food";
import isRectsCollide from "./isRectsCollide";
import palette from "./palette";
import placeRandom from "./placeRandom";

let playerRectArray: Rect[] = [placeRandom(PLAYER_SIZE)];
let playerVelocity: XY = { x: 0, y: 0 };
let playerSpeedModifier: number = INITIAL_PLAYER_SPEED_MODIFIER;
let playerGrowthTimer: number = 0;

function playerMovementController(code: string) {
	let { x, y } = playerVelocity;

	if (code == "ArrowUp" && y != 1) {
		x = 0;
		y = -1;
	} else if (code == "ArrowDown" && y != -1) {
		x = 0;
		y = 1;
	} else if (code == "ArrowLeft" && x != 1) {
		x = -1;
		y = 0;
	} else if (code == "ArrowRight" && x != -1) {
		x = 1;
		y = 0;
	}

	playerVelocity = {
		x: x * playerSpeedModifier,
		y: y * playerSpeedModifier,
	};
}

function update(deltaTime: number) {
	const playerRectHead = playerRectArray[0];
	const foodRect = food.getFoodRect();

	playerRectArray.unshift({
		x: playerRectHead.x + playerVelocity.x * deltaTime,
		y: playerRectHead.y + playerVelocity.y * deltaTime,
		width: playerRectHead.width,
		height: playerRectHead.height,
	});

	if (playerGrowthTimer > 0) playerGrowthTimer--;
	if (playerGrowthTimer === 0) playerRectArray.pop();

	if (isRectsCollide(playerRectHead, foodRect)) {
		food.setFoodRect(placeRandom(FOOD_SIZE));
		playerSpeedModifier += PLAYER_SPEED_MODIFIER_INCREMENT;
		playerGrowthTimer = PLAYER_GROWTH_TIME;
	}
}

function render(context: CanvasRenderingContext2D) {
	context.fillStyle = palette.primary;

	for (let i = 0; i < playerRectArray.length; i++) {
		const playerRect = playerRectArray[i];
		context.fillRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height);
	}
}

export default {
	playerRectArray: playerRectArray,
	playerVelocity: playerVelocity,
	playerMovementController: playerMovementController,
	update: update,
	render: render,
};
