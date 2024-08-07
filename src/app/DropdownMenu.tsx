import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import DropDown from "@/components/DropdownMenu/DropDown";

const options = [
	{
		label: "Charts",
		iconName: "barschart",
	},
	{
		label: "Books",
		iconName: "book",
	},
	{ label: "Calendar", iconName: "calendar" },
	{ label: "Contacts", iconName: "contacts" },
];

const header = {
	label: "Menu",
	iconName: "ellipsis1",
};

const DropdownMenu = () => {
	return (
		<>
			<View style={styles.container}>
				<StatusBar style='light' />
				<DropDown header={header} options={options} />
			</View>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default DropdownMenu;
