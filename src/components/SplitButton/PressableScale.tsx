import { type StyleProp, View, type ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type PressableScaleProps = {
	children?: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
};

export const PressableScale: React.FC<PressableScaleProps> = ({ ...PressableScaleProps }) => {
	const scale = useSharedValue(1);

	const gesture = Gesture.Tap()
		.maxDuration(5000)
		.onTouchesDown(() => {
			scale.value = withTiming(0.8);
		})
		.onTouchesUp(() => {
			if (PressableScaleProps.onPress) {
				runOnJS(PressableScaleProps.onPress)();
			}
		})
		.onFinalize(() => {
			scale.value = withTiming(1);
		});

	const rButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: scale.value,
				},
			],
		};
	}, [scale]);

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[PressableScaleProps.style, rButtonStyle]}>
				{PressableScaleProps.children}
			</Animated.View>
		</GestureDetector>
	);
};
