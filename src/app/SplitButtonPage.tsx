import { StyleSheet, Text, View } from "react-native";
import { Palette } from "@/constants/SplitPalette";
import { SplitButton } from "@/components/SplitButton/SplitButton";
import { useState } from "react";
const SplitButtonPage = () => {
	const [splitted, setSplitted] = useState(false);

	return (
		<View style={styles.container}>
			<SplitButton
				splitted={splitted}
				mainAction={{
					label: "Stop",
					onPress: () => {
						setSplitted(true);
					},
					backgroundColor: Palette.card,
				}}
				leftAction={{
					label: "Resume",
					onPress: () => {
						setSplitted(false);
					},
					backgroundColor: Palette.card,
				}}
				rightAction={{
					label: "Finish",
					onPress: () => {
						console.log("Finish Pressed");
					},
					backgroundColor: Palette.highlight,
				}}
			/>
		</View>
	);
};

export default SplitButtonPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Palette.background,
		alignItems: "center",
		justifyContent: "center",
	},
});
