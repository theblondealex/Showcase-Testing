import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children: React.ReactNode;
}

const Ripple: React.FC<RippleProps> = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);
  const rippleOpacity = useSharedValue(1);

  const aRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const tapGestureEvent = Gesture.Tap()
    .onStart((event) => {
      const layout = measure(aRef);
      if (!layout) return;
      width.value = layout.width;
      height.value = layout.height;

      centerX.value = event.x;
      centerY.value = event.y;

      rippleOpacity.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });

      if (onTap) {
        runOnJS(onTap)();
      }
    })
    .onFinalize(() => {
      rippleOpacity.value = withTiming(0, { duration: 1000 });
    });

  const rStyleCircle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: '#D4D4D4',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        {
          translateX,
        },
        {
          translateY,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <View ref={aRef} style={style}>
      <GestureDetector gesture={tapGestureEvent}>
        <Animated.View style={[style, { overflow: 'hidden' }]}>
          <View>{children}</View>
          <Animated.View style={rStyleCircle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Ripple;
