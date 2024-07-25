import CheckBoxItem from "@/components/CheckBox/CheckBoxItem";
import useCuisines from "@/hooks/useCuisines";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const CheckBox = () => {
	const { cuisines, toggleCuisine } = useCuisines();

	const { top: safeTop } = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingTop: safeTop + 24, paddingLeft: 24 }]}>
			<Text style={styles.title}>What are your favorite cuisines?</Text>
			<View style={styles.listContainter}>
				{cuisines.map((cuisine) => (
					<CheckBoxItem
						key={cuisine.id}
						label={cuisine.name}
						checked={cuisine.selected}
						onPress={() => {
							toggleCuisine(cuisine.id);
						}}
					/>
				))}
			</View>
		</View>
	);
};

export default CheckBox;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	title: {
		fontSize: 24,
		color: "#fff",
		fontFamily: "SF-Pro-Rounded-Bold",
	},
	listContainter: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 16,
		marginTop: 24,
	},
});
