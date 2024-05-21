import { Drawer } from "expo-router/drawer";
import { View, Text } from "react-native";
const index = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          title: "Swipe Button",
        }}
      />
      <View>
        <Text>index</Text>
      </View>
    </>
  );
};
export default index;
