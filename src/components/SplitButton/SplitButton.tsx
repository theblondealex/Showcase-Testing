import { Palette } from "@/constants/SplitPalette";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { PressableScale } from "./PressableScale";

type SplitAction = {
	label: string;
	onPress: () => void;
	backgroundColor: string;
};

type SplitButtonProps = {
	splitted: boolean;
	mainAction: SplitAction;
	leftAction: SplitAction;
	rightAction: SplitAction;
};

const buttonHeight = 60;
export const SplitButton: React.FC<SplitButtonProps> = ({
	splitted,
	mainAction,
	leftAction,
	rightAction,
}) => {
	const windowWidth = useWindowDimensions().width;

	const paddingHorizontal = 20;
	const gap = 10;
	const splittedWidth = (windowWidth - paddingHorizontal * 2 - gap) / 2;

	const rLeftButtonStyle = useAnimatedStyle(() => {
		const leftButtonWidth = splitted ? splittedWidth : 0;
		return {
			width: withTiming(leftButtonWidth),
			opacity: withTiming(splitted ? 1 : 0),
		};
	}, [splitted]);

	const rTextStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(splitted ? 1 : 0, {
				duration: 100,
			}),
		};
	}, [splitted]);

	const rMainButtonStyle = useAnimatedStyle(() => {
		const mainButtonWidth = splitted ? splittedWidth : splittedWidth * 2 + gap;
		return {
			width: withTiming(mainButtonWidth),
			marginLeft: withTiming(splitted ? gap : 0),
			backgroundColor: withTiming(
				splitted ? rightAction.backgroundColor : mainAction.backgroundColor,
			),
		};
	}, [splitted]);

	const rMainTextStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(splitted ? 0 : 1),
		};
	}, [splitted]);

	const rRightTextStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(splitted ? 1 : 0),
		};
	}, [splitted]);

	return (
		<View
			style={{
				width: "100%",
				height: buttonHeight,
				paddingHorizontal: paddingHorizontal,
				flexDirection: "row",
			}}>
			<PressableScale
				onPress={leftAction.onPress}
				style={[
					{
						backgroundColor: leftAction.backgroundColor,
					},
					styles.button,
					rLeftButtonStyle,
				]}>
				<Animated.Text numberOfLines={1} style={[styles.label, rTextStyle]}>
					{leftAction.label}
				</Animated.Text>
			</PressableScale>
			<PressableScale
				onPress={splitted ? rightAction.onPress : mainAction.onPress}
				style={[styles.button, rMainButtonStyle]}>
				<Animated.Text style={[styles.label, rMainTextStyle]}>{mainAction.label}</Animated.Text>
				<Animated.Text style={[styles.label, rRightTextStyle]}>{rightAction.label}</Animated.Text>
			</PressableScale>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		fontFamily: "FiraCodeRegular",
		fontSize: 16,
		color: Palette.text,
		textTransform: "lowercase",
		position: "absolute",
	},
	button: {
		height: buttonHeight,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		borderCurve: "continuous",
	},
});
