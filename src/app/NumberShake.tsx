import { useAnimatedShake } from '@/hooks/useAnimatedShake';
import { Entypo } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const NumberShake = () => {
  const { rShakeStyle, handleShake, isShaking } = useAnimatedShake();

  const [count, setCount] = useState(10);

  const onIncrement = useCallback(() => {
    setCount((prev) => {
      if (prev === 10) {
        handleShake();
        return prev;
      }
      return prev + 1;
    });
  }, [handleShake]);

  const onDecrement = useCallback(() => {
    setCount((prev) => {
      if (prev === 0) {
        handleShake();
        return prev;
      }
      return prev - 1;
    });
  }, [handleShake]);

  const rErrorStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isShaking.value ? 'red' : 'black', {
        duration: 250,
      }),
    };
  }, [isShaking]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.number, rShakeStyle, rErrorStyle]}>{count}</Animated.Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrement}>
          <Entypo name="minus" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onIncrement}>
          <Entypo name="plus" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    right: 48,
    bottom: 48,
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    height: 64,
    aspectRatio: 1,
    backgroundColor: '#000',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NumberShake;
