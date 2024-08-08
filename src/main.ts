import food from "./food";
import background from "./background";
import game from "./game";
import player from "./player";

game.init((canvas, context, deltaTime) => {
	background.render(canvas, context);
	food.render(context);
	player.update(deltaTime);
	player.render(context);
});
