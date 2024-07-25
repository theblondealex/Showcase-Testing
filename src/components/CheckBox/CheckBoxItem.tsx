import { ACTIVE_COLOR, INACTIVE_COLOR } from "@/constants/CheckBoxConstants";
import { AntDesign } from "@expo/vector-icons";
import Color from "color";
import { StyleSheet } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

type CheckBoxItemProps = {
	label: string;
	checked: boolean;
	onPress: () => void;
};

const timingConfig = { duration: 250 };

const CheckBoxItem: React.FC<CheckBoxItemProps> = ({ label, checked, onPress }) => {
	const fadedActiveColor = Color(ACTIVE_COLOR).alpha(0.2).string();

	const rContainerStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(checked ? fadedActiveColor : "transparent", timingConfig),
			borderColor: withTiming(checked ? ACTIVE_COLOR : INACTIVE_COLOR, timingConfig),
			paddingLeft: 20,
			paddingRight: !checked ? 20 : 14,
		};
	}, [checked]);

	const rTextStyle = useAnimatedStyle(() => {
		return {
			color: withTiming(checked ? ACTIVE_COLOR : INACTIVE_COLOR, timingConfig),
		};
	}, [checked]);

	return (
		<Animated.View
			layout={LinearTransition.springify().mass(0.6)}
			style={[styles.container, rContainerStyle]}
			onTouchEnd={onPress}>
			<Animated.Text style={[styles.name, rTextStyle]}>{label}</Animated.Text>
			{checked ? (
				<Animated.View
					entering={FadeIn.duration(350)}
					exiting={FadeOut}
					style={{
						marginLeft: 8,
						justifyContent: "center",
						alignItems: "center",
						height: 20,
						width: 20,
					}}>
					<AntDesign name='checkcircle' size={20} color={ACTIVE_COLOR} />
				</Animated.View>
			) : null}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		borderRadius: 32,
		borderWidth: 1,
		borderColor: "#FFF",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	name: {
		fontSize: 14,
		color: "#fff",
		fontFamily: "SF-Pro-Rounded-Bold",
	},
});

export default CheckBoxItem;
