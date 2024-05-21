import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const ICON_SIZE = 20;

const SlidingCounter = () => {
  return (
    <View
      style={{
        height: 70,
        width: 170,
        backgroundColor: "#111111",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
      }}
    >
      <AntDesign name="minus" color={"white"} size={ICON_SIZE} />
      <AntDesign name="close" color={"white"} size={ICON_SIZE} />
      <AntDesign name="plus" color={"white"} size={ICON_SIZE} />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PanGestureHandler>
          <Animated.View
            style={{
              width: 100,
              height: 50,
              backgroundColor: " #ff0000",
              borderRadius: 25,
              position: "absolute",
            }}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
};
export default SlidingCounter;
