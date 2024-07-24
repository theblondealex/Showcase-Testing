import {
	height,
	MAX_SPEED,
	PADDLE_HEIGHT,
	PADDLE_WIDTH,
	RADIUS,
	width,
} from "@/constants/BrickBreakerConstants";
import type {
	BrickInterface,
	CircleInterface,
	Collision,
	PaddleInterface,
	ShapeInterface,
} from "@/types/BrickBreakerTypes";
import type { SharedValue } from "react-native-reanimated";

export const createBouncingExample = (circleObject: CircleInterface) => {
	"worklet";

	circleObject.x.value = 100;
	circleObject.y.value = 450;
	circleObject.r = RADIUS;
	circleObject.ax = 0.5;
	circleObject.ay = 1;
	circleObject.vx = 0;
	circleObject.vy = 0;
};

const move = (object: ShapeInterface, dt: number) => {
	"worklet";

	object.vx += object.ax * dt;
	object.vy += object.ay * dt;

	if (object.vx > MAX_SPEED) {
		object.vx = MAX_SPEED;
	}

	if (object.vx < -MAX_SPEED) {
		object.vx = -MAX_SPEED;
	}

	if (object.vy > MAX_SPEED) {
		object.vy = MAX_SPEED;
	}

	if (object.vy < -MAX_SPEED) {
		object.vy = -MAX_SPEED;
	}

	object.x.value += object.vx * dt;
	object.y.value += object.vy * dt;
};

export const resolveWallCollision = (object: ShapeInterface) => {
	"worklet";

	const circleObject = object as CircleInterface;

	//right wall collision
	if (circleObject.x.value + circleObject.r > width) {
		circleObject.x.value = width - circleObject.r * 2;
		circleObject.vx = -circleObject.vx;
		circleObject.ax = -circleObject.ax;
	}

	//bottom wall collision
	else if (circleObject.y.value + circleObject.r > height) {
		//stop the ball they lost
		circleObject.x.value = 100;
		circleObject.y.value = 450;
		circleObject.ax = 0.5;
		circleObject.ay = 1;
		circleObject.vx = 0;
		circleObject.vy = 0;
		return true;
	}

	//left wall collision
	else if (circleObject.x.value - circleObject.r < 0) {
		circleObject.x.value = circleObject.r * 2;
		circleObject.vx = -circleObject.vx;
		circleObject.ax = -circleObject.ax;
	}

	//top wall collision
	else if (circleObject.y.value - circleObject.r < 0) {
		circleObject.y.value = circleObject.r * 2;
		circleObject.vy = -circleObject.vy;
		circleObject.ay = -circleObject.ay;
	}
	return false;
};

export const resolveCollisionWithBounce = (info: Collision) => {
	"worklet";
	const circleInfo = info.o1 as CircleInterface;

	circleInfo.y.value = circleInfo.y.value - circleInfo.r;

	circleInfo.vy = -circleInfo.vy;
	circleInfo.ay = -circleInfo.ay;
};

function circleRect(cx: number, cy: number, rx: number, ry: number, rw: number, rh: number) {
	"worklet";

	//temp vars for to set edges to test
	let testX = cx;
	let testY = cy;

	//which edge is closest to the circle
	if (cx < rx)
		testX = rx; //test left edge
	else if (cx > rx + rw) testX = rx + rw; //test right edge
	if (cy < ry)
		testY = ry; //test top edge
	else if (cy > ry + rh) testY = ry + rh; //test bottom edge

	//get the distance from the closest edge to the circle center
	const distX = cx - testX;
	const distY = cy - testY;
	const distance = Math.sqrt(distX ** 2 + distY ** 2);

	//if the distance is less than the radius, then there is a collision
	if (distance <= RADIUS) {
		return true;
	}
	return false;
}

export const checkCollision = (o1: ShapeInterface, o2: ShapeInterface) => {
	"worklet";

	//paddle hits ball
	if (o1.type === "Circle" && o2.type === "Paddle") {
		const dx = o2.x.value - o1.x.value;
		const dy = o2.y.value - o1.y.value;
		const distance = Math.sqrt(dx ** 2 + dy ** 2);

		const circleObject = o1 as CircleInterface;
		const rectangleObject = o2 as PaddleInterface;

		const isCollision = circleRect(
			circleObject.x.value,
			circleObject.y.value,
			rectangleObject.x.value,
			rectangleObject.y.value,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
		);

		if (isCollision) {
			return {
				collisionInfo: {
					o1,
					o2,
					dx,
					dy,
					distance,
				},
				collided: true,
			};
		}
	}

	//ball hits brick
	if (o1.type === "Circle" && o2.type === "Brick") {
		//ball hits brick get values
		const dx = o2.x.value - o1.x.value;
		const dy = o2.y.value - o1.y.value;
		const distance = Math.sqrt(dx ** 2 + dy ** 2);
		const circleObject = o1 as CircleInterface;
		const brickObject = o2 as BrickInterface;
		if (!brickObject.canCollide.value) {
			//brick is technically invisable
			return {
				collisionInfo: null,
				collided: false,
			};
		}

		const isCollision = circleRect(
			circleObject.x.value,
			circleObject.y.value,
			brickObject.x.value,
			brickObject.y.value,
			PADDLE_WIDTH,
			PADDLE_HEIGHT,
		);

		if (isCollision) {
			brickObject.canCollide.value = false;
			return {
				collisionInfo: {
					o1,
					o2,
					dx,
					dy,
					distance,
				},
				collided: true,
			};
		}
	}

	return {
		collisionInfo: null,
		collided: false,
	};
};

export const animate = (
	objects: ShapeInterface[],
	timeSincePreviousFrame: number,
	brickCount: SharedValue<number>,
) => {
	"worklet";
	for (const o of objects) {
		if (o.type === "Circle") {
			move(o, (0.15 / 16) * timeSincePreviousFrame);
		}
	}

	for (const o of objects) {
		const isGameLost = resolveWallCollision(o);
		if (isGameLost) {
			brickCount.value = -1;
		}
	}

	const collisions: Collision[] = [];

	for (const [i, o1] of objects.entries()) {
		for (const [j, o2] of objects.entries()) {
			if (i !== j) {
				const { collided, collisionInfo } = checkCollision(o1, o2);
				if (collided && collisionInfo) {
					collisions.push(collisionInfo);
				}
			}
		}
	}

	for (const collision of collisions) {
		if (collision.o2.type === "Brick") {
			brickCount.value++;
		}
		resolveCollisionWithBounce(collision);
	}
};
