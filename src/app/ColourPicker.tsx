import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import ColourPickerComponent from '@/components/ColourPicker/ColourPickerComponent';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useCallback } from 'react';

const colors = ['red', 'purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'black', 'white'];

const backgroundColor = 'rgba(0,0,0,0.9)';

const ColourPicker = () => {
  const pickerWidth = useWindowDimensions().width;
  const PICKER_WIDTH = pickerWidth * 0.9;
  const circleWidth = PICKER_WIDTH * 0.8;
  const pickedColor = useSharedValue<string>(colors[0]);

  const onColorChange = useCallback(
    (color: string) => {
      'worklet';
      pickedColor.value = color;
    },
    [pickedColor]
  );

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value as string,
    };
  });

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View
          style={[
            {
              width: circleWidth,
              height: circleWidth,
              borderRadius: circleWidth / 2,
            },
            rCircleStyle,
          ]}
        />
      </View>
      <View style={styles.bottomContainer}>
        <ColourPickerComponent
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          maxWidth={PICKER_WIDTH}
          style={[styles.gradient, { width: PICKER_WIDTH }]}
          onColorChange={onColorChange}
        />
      </View>
    </>
  );
};
export default ColourPicker;
const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    borderRadius: 20,
    height: 40,
  },
});
