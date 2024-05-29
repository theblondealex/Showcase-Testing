import {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  ReduceMotion,
  useDerivedValue,
} from 'react-native-reanimated';

export const useAnimatedShake = () => {
  const shakeTranslateX = useSharedValue<number>(0);

  const rShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shakeTranslateX.value,
        },
      ],
    };
  });

  const isShaking = useDerivedValue<boolean>(() => shakeTranslateX.value !== 0, [shakeTranslateX]);

  const handleShake = () => {
    const OFFSET = 15;
    const TIME = 80;
    const timingConfig = {
      duration: TIME,
      easing: Easing.inOut(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    };

    shakeTranslateX.value = withSequence(
      // start from -OFFSET
      withTiming(-OFFSET, timingConfig),
      // shake between -OFFSET and OFFSET 5 times
      withRepeat(withTiming(OFFSET, { duration: TIME }), 3, true),
      // go back to 0 at the end
      withTiming(0, timingConfig)
    );
  };

  return { rShakeStyle, handleShake, isShaking };
};
