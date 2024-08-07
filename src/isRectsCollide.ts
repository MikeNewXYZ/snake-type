export default function isRectsCollide(rectOne: Rect, rectTwo: Rect): boolean {
	if (
		rectOne.x + rectOne.width >= rectTwo.x &&
		rectOne.x <= rectTwo.x + rectTwo.width &&
		rectOne.y + rectOne.height >= rectTwo.y &&
		rectOne.y <= rectTwo.y + rectTwo.height
	) {
		return true;
	}

	return false;
}
