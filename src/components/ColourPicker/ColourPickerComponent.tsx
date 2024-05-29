import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient, type LinearGradientProps } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  interpolateColor,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useCallback } from 'react';

interface ColourPickerProps extends LinearGradientProps {
  maxWidth: number;
  onColorChange?: (color: string) => void;
}

const ColourPickerComponent: React.FC<ColourPickerProps> = ({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChange,
}) => {
  const pickerX = useSharedValue<number>(0);
  const pickerY = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const context = useSharedValue({ x: 0, y: 0 });
  const barRef = useAnimatedRef<View>();

  const onEnd = useCallback(() => {
    'worklet';
    pickerY.value = withSpring(0);
    scale.value = withSpring(1.2);
  }, [pickerY, scale]);

  const pickerPanGesture = Gesture.Pan()
    .onStart((event) => {
      const layout = measure(barRef);
      if (!layout) return;
      context.value = { x: clamp(pickerX.value, 0, layout.width - CirclePickerSize), y: 0 };
      pickerY.value = withSpring(-CirclePickerSize);
      scale.value = withSpring(1.2);
    })
    .onUpdate((event) => {
      const layout = measure(barRef);
      if (!layout) return;
      pickerX.value = clamp(
        event.translationX + context.value.x,
        0,
        layout.width - CirclePickerSize
      );
    })
    .onEnd(() => {
      onEnd();
    });

  const pickerTapGesture = Gesture.Tap()
    .onBegin((event) => {
      const layout = measure(barRef);
      if (!layout) return;
      pickerY.value = withSpring(-CirclePickerSize);
      scale.value = withSpring(1.2);
      pickerX.value = withTiming(event.absoluteX - CirclePickerSize / 2);
    })
    .onEnd(() => {
      onEnd();
    });

  const rPickerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: pickerX.value,
        },
        {
          scale: scale.value,
        },
        {
          translateY: pickerY.value,
        },
      ],
    };
  });

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, index) => (index / colors.length) * maxWidth);

    const backgroundColor = interpolateColor(pickerX.value, inputRange, colors);

    onColorChange?.(backgroundColor);

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(pickerTapGesture, pickerPanGesture)}>
      <View style={{ justifyContent: 'center' }} ref={barRef}>
        <LinearGradient colors={colors} start={start} end={end} style={style} />
        <Animated.View style={[styles.pickerContainer, rPickerStyle]}>
          <Animated.View style={[styles.internalPickerContainer, rInternalPickerStyle]} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

const CirclePickerSize = 45;
const internalPickerSize = CirclePickerSize / 2;

const styles = StyleSheet.create({
  pickerContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: CirclePickerSize,
    height: CirclePickerSize,
    borderRadius: CirclePickerSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalPickerContainer: {
    width: internalPickerSize,
    height: internalPickerSize,
    borderRadius: internalPickerSize / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default ColourPickerComponent;
