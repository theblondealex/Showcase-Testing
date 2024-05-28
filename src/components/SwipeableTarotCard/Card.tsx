import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Easing } from 'react-native';
import { Image } from 'expo-image';
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { snapPoint } from 'react-native-redash';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width: wWidth, height } = Dimensions.get('window');

const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
const side = (wWidth + CARD_WIDTH + 30) / 2;
const SNAP_POINTS = [-side, 0, side];

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  index: number;
}

export const Card = ({ card: { source } }: CardProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const rotateZ = useSharedValue(Math.random() * 20 - 10);
  const scale = useSharedValue(1);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
      //   scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease), duration: DURATION });
      //   rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
    },
    onActive: ({ translationX, translationY }, ctx) => {
      x.value = ctx.x + translationX;
      y.value = ctx.y + translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(x.value, y.value, SNAP_POINTS);
      x.value = withSpring(dest, { velocity: velocityX });
      y.value = withSpring(0, { velocity: velocityY });
      //   scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease), duration: DURATION });
      //   rotateZ.value = withTiming(Math.random() * 20 - 10, { easing: Easing.inOut(Easing.ease) });
    },
  });

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { rotateX: '30deg' },
      { rotateZ: `${rotateZ.value}deg` },
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={onGestureEvent}>
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
      </PanGestureHandler>
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