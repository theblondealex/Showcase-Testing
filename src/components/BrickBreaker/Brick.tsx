import type { BrickInterface } from "@/types/BrickBreakerTypes";
import { LinearGradient, RoundedRect, vec } from "@shopify/react-native-skia";
import { StyleSheet, Text, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

interface Prop {
	idX: number;
	brick: BrickInterface;
}

const Brick = ({ idX, brick }: Prop) => {
	const color = useDerivedValue(() => {
		return brick.canCollide.value ? "blue" : "transparent";
	}, [brick.canCollide]);

	return (
		<RoundedRect
			key={idX}
			x={brick.x}
			y={brick.y}
			width={brick.width}
			height={brick.height}
			r={8}
			color={color}>
			<LinearGradient start={vec(5, 300)} end={vec(4, 50)} colors={["blue", "red"]} />
		</RoundedRect>
	);
};
export default Brick;
