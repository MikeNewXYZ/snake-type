import {
	CANVAS_SIZE,
	FOOD_SIZE,
	INITIAL_PLAYER_SPEED_MODIFIER,
	PLAYER_GROWTH_DANGER_FROM,
	PLAYER_GROWTH_TICKS,
	PLAYER_SIZE,
	PLAYER_SPEED_MODIFIER_INCREMENT,
} from "./constants";
import food from "./food";
import game from "./game";
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
	const foodRect = food.getFoodRect();

	playerRectArray.unshift({
		x: playerRectArray[0].x + playerVelocity.x * deltaTime,
		y: playerRectArray[0].y + playerVelocity.y * deltaTime,
		width: playerRectArray[0].width,
		height: playerRectArray[0].height,
	});

	if (playerRectArray[0].x < 0) playerRectArray[0].x = CANVAS_SIZE - PLAYER_SIZE;
	if (playerRectArray[0].x + PLAYER_SIZE > CANVAS_SIZE) playerRectArray[0].x = 0;
	if (playerRectArray[0].y < 0) playerRectArray[0].y = CANVAS_SIZE - PLAYER_SIZE;
	if (playerRectArray[0].y + PLAYER_SIZE > CANVAS_SIZE) playerRectArray[0].y = 0;

	if (playerGrowthTimer > 0) playerGrowthTimer--;
	if (playerGrowthTimer === 0) playerRectArray.pop();

	for (let i = PLAYER_GROWTH_DANGER_FROM; i < playerRectArray.length; i++) {
		if (isRectsCollide(playerRectArray[0], playerRectArray[i])) game.reset();
	}

	if (isRectsCollide(playerRectArray[0], foodRect)) {
		food.setFoodRect(placeRandom(FOOD_SIZE));
		playerSpeedModifier += PLAYER_SPEED_MODIFIER_INCREMENT;
		playerGrowthTimer = PLAYER_GROWTH_TICKS;
	}
}

function render(context: CanvasRenderingContext2D) {
	for (let i = 0; i < playerRectArray.length; i++) {
		if (i < PLAYER_GROWTH_DANGER_FROM) {
			context.fillStyle = palette.primary;
		} else {
			context.fillStyle = palette.secondary;
		}

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
