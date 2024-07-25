import { shader } from "@/assets/shader";
import Brick from "@/components/BrickBreaker/Brick";
import {
	BRICK_HEIGHT,
	BRICK_MIDDLE,
	BRICK_ROW_LENGTH,
	BRICK_WIDTH,
	height,
	PADDLE_HEIGHT,
	PADDLE_MIDDLE,
	PADDLE_WIDTH,
	RADIUS,
	TOTAL_BRICKS,
	width,
} from "@/constants/BrickBreakerConstants";
import type { BrickInterface, CircleInterface, PaddleInterface } from "@/types/BrickBreakerTypes";
import { animate, createBouncingExample } from "@/Utils/BrickBreaker/Logic";
import {
	Canvas,
	Circle,
	Rect,
	RoundedRect,
	Shader,
	useClock,
	vec,
	matchFont,
	LinearGradient,
	Text,
} from "@shopify/react-native-skia";
import { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useFrameCallback, useSharedValue } from "react-native-reanimated";

const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
const fontStyle = {
	fontFamily,
	fontSize: 55,
	fontWeight: "bold",
};

// @ts-ignore
const font = matchFont(fontStyle);

export default function App() {
	const brickCount = useSharedValue(0);
	const clock = useClock();

	const [gameStatus, setGameStatus] = useState<"won" | "lost" | "playing" | "not started">(
		"not started",
	);

	const circleObject: CircleInterface = {
		type: "Circle",
		id: 0,
		x: useSharedValue(0),
		y: useSharedValue(0),
		r: RADIUS,
		ax: 0,
		ay: 0,
		vx: 0,
		vy: 0,
	};

	const rectangleObject: PaddleInterface = {
		type: "Paddle",
		id: 0,
		x: useSharedValue(PADDLE_MIDDLE),
		y: useSharedValue(height - 100),
		ax: 0,
		ay: 0,
		vx: 0,
		vy: 0,
		height: PADDLE_HEIGHT,
		width: PADDLE_WIDTH,
	};

	const bricks: BrickInterface[] = Array(TOTAL_BRICKS)
		.fill(0)
		.map((_, idx) => {
			const farBrickX = BRICK_MIDDLE + BRICK_WIDTH + 50;
			const middleBrickX = BRICK_MIDDLE;
			const closeBrickX = BRICK_MIDDLE - BRICK_WIDTH - 50;
			const startingY = 60;
			const ySpacing = 45;

			let startingXPosition = -1;
			if (idx % BRICK_ROW_LENGTH === 0) {
				startingXPosition = farBrickX;
			} else if (idx % BRICK_ROW_LENGTH === 1) {
				startingXPosition = middleBrickX;
			} else if (idx % BRICK_ROW_LENGTH === 2) {
				startingXPosition = closeBrickX;
			}

			const staringYPosition = startingY + ySpacing * Math.floor(idx / BRICK_ROW_LENGTH);

			return {
				type: "Brick",
				id: 0,
				x: useSharedValue(startingXPosition),
				y: useSharedValue(staringYPosition),
				ax: 0,
				ay: 0,
				vx: 0,
				vy: 0,
				width: BRICK_WIDTH,
				height: BRICK_HEIGHT,
				canCollide: useSharedValue(true),
			};
		});

	const resetGame = () => {
		"worklet";

		rectangleObject.x.value = PADDLE_MIDDLE;

		createBouncingExample(circleObject);
		for (const brick of bricks) {
			brick.canCollide.value = true;
		}
		brickCount.value = 0;
	};

	createBouncingExample(circleObject);

	useFrameCallback((frameInfo) => {
		if (!frameInfo.timeSincePreviousFrame) {
			return;
		}

		if (brickCount.value === TOTAL_BRICKS || brickCount.value === -1) {
			circleObject.ax = 0.5;
			circleObject.ay = 1;
			circleObject.vx = 0;
			circleObject.vy = 0;
			return;
		}

		animate(
			[circleObject, rectangleObject, ...bricks],
			frameInfo.timeSincePreviousFrame,
			brickCount,
		);
	});

	const gesture = Gesture.Pan()
		.onBegin(() => {
			if (brickCount.value === TOTAL_BRICKS || brickCount.value === -1) {
				resetGame();
			}
		})
		.onChange(({ x, y }) => {
			rectangleObject.x.value = x - PADDLE_WIDTH / 2;
		});

	const uniforms = useDerivedValue(() => {
		return {
			iResolution: vec(width, height),
			iTime: clock.value * 0.0005,
		};
	}, [width, height, clock]);

	const opacity = useDerivedValue(() => {
		return brickCount.value === TOTAL_BRICKS || brickCount.value === -1 ? 1 : 0;
	}, [brickCount]);

	const textPosition = useDerivedValue(() => {
		const endText = brickCount.value === TOTAL_BRICKS ? "YOU WIN" : "YOU LOSE";
		return (width - font.measureText(endText).width) / 2;
	}, [font]);

	const gameEndingText = useDerivedValue(() => {
		return brickCount.value === TOTAL_BRICKS ? "YOU WIN" : "YOU LOSE";
	}, []);

	return (
		<GestureDetector gesture={gesture}>
			<View style={styles.container}>
				<Canvas style={{ flex: 1 }}>
					<Rect x={0} y={0} width={width} height={height}>
						<Shader source={shader} uniforms={uniforms} />
					</Rect>
					<Circle cx={circleObject.x} cy={circleObject.y} r={RADIUS} color={"red"} />
					<RoundedRect
						x={rectangleObject.x}
						y={rectangleObject.y}
						width={rectangleObject.width}
						height={rectangleObject.height}
						r={8}
						color={"pink"}
					/>
					{bricks.map((brick, idx) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Brick key={idx} idX={idx} brick={brick} />
					))}
					<Rect x={0} y={0} height={height} width={width} color={"red"} opacity={opacity}>
						<LinearGradient start={vec(0, 200)} end={vec(0, 500)} colors={["#4070D3", "#EA2F86"]} />
					</Rect>
					<Text
						x={textPosition}
						y={height / 2}
						text={gameEndingText}
						font={font}
						opacity={opacity}
					/>
				</Canvas>
			</View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	titleContainer: {
		flexDirection: "row",
	},
	titleTextNormal: {
		color: "white",
		fontSize: 40,
	},
	titleTextBold: {
		color: "white",
		fontSize: 40,
		fontWeight: "bold",
	},
});
