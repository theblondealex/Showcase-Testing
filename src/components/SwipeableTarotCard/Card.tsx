import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Dimensions, Easing, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

const { width, height } = Dimensions.get('window');

const aspectRatio = 722 / 368;
const CARD_WIDTH = width - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
const side = (width + CARD_WIDTH) / 2;
const SNAP_POINTS = [-side, 0, side];

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  index: number;
  shuffleBack: SharedValue<boolean>;
}

export const Card = ({ card: { source }, index, shuffleBack }: CardProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(-2 * height);
  const theta = Math.random() * 20 - 10;
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);
  const context = useSharedValue({ x: 0, y: 0 });

  useAnimatedReaction(
    () => shuffleBack.value,
    () => {
      if (shuffleBack.value) {
        const delay = index * 150;
        x.value = withDelay(delay, withSpring(0, {}));
        rotateZ.value = withDelay(
          delay,
          withSpring(theta, {}, () => {
            shuffleBack.value = false;
          })
        );
      }
    }
  );

  useEffect(() => {
    if (index === 0) {
      shuffleBack.value = true;
    }
  }, [index, shuffleBack]);

  useEffect(() => {
    const delay = index * DURATION;
    y.value = withDelay(delay, withTiming(0, { duration: DURATION }));
    rotateZ.value = withDelay(delay, withTiming(theta, { duration: DURATION }));
  }, [index, y, rotateZ, theta]);

  const cardGesture = Gesture.Pan()
    .onStart((event) => {
      context.value = { x: x.value, y: y.value };
      scale.value = withTiming(1.1);
      rotateZ.value = withTiming(0);
    })
    .onUpdate((event) => {
      x.value = event.translationX + context.value.x;
      y.value = event.translationY + context.value.y;
    })
    .onEnd((event) => {
      const dest = snapPoint(x.value, y.value, SNAP_POINTS);
      x.value = withSpring(dest, { velocity: event.velocityX });
      y.value = withSpring(0, { velocity: event.velocityY });
      scale.value = withTiming(1, { duration: DURATION }, () => {
        if (index === 0 && dest !== 0) {
          shuffleBack.value = true;
        }
      });
      // rotateZ.value = withTiming(0);
    });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      // { rotateX: '30deg' },
      { rotateZ: `${rotateZ.value}deg` },
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={cardGesture}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <Image
            source={source}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
            contentFit="contain"
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
