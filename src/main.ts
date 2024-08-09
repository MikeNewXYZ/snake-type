import game from "./game";
import background from "./background";
import food from "./food";
import player from "./player";
import score from "./score";

game.init((canvas, context, deltaTime) => {
	background.render(canvas, context);
	food.render(context);
	player.update(deltaTime);
	player.render(context);
	score.render(context);
});
