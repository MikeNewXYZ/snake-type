export const PERFECT_FRAME_TIME = 1000 / 60;

export const DEFAULT_FONT = "Space Grotesk";

export const CANVAS_SIZE = window.innerWidth >= window.innerHeight ? window.innerHeight : window.innerWidth;

export const PLAYER_SIZE = 50;
export const INITIAL_PLAYER_SPEED_MODIFIER = 1;
export const PLAYER_SPEED_MODIFIER_INCREMENT = 0.1;
export const PLAYER_GROWTH_DANGER_FROM = 100;
export const PLAYER_GROWTH_TICKS = 50;

export const FOOD_SIZE = 30;

export const ALL_DIRECTIONS: Array<keyof DirectionWords> = ["up", "down", "left", "right"];
export const DIRECTION_TEXT_INITIAL_Y = 45;
export const DIRECTION_TEXT_SPACING_Y = 35;
