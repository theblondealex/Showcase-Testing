import { StyleSheet } from "react-native";
import DropDownListItem from "./DropDownListItem";
import { useSharedValue } from "react-native-reanimated";

type optionsType = {
	label: string;
	iconName: string;
};

type DropDownProps = {
	header: {
		label: string;
		iconName: string;
	};
	options: optionsType[];
};

const DropDown: React.FC<{
	header: DropDownProps["header"];
	options: DropDownProps["options"];
}> = ({ header, options }) => {
	const dropdownItems = [header, ...options];

	const isExpanded = useSharedValue(false);

	return (
		<>
			{dropdownItems.map((item, index) => (
				<DropDownListItem
					key={item.label}
					index={index}
					{...item}
					isExpanded={isExpanded}
					dropdownItemsCount={dropdownItems.length}
				/>
			))}
		</>
	);
};
export default DropDown;
const styles = StyleSheet.create({});
