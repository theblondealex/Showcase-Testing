import React from 'react';
import { StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import { Image } from 'expo-image';

const CHARACTER_WIDTH = 200;
const CHARACTER_ASPECT_RATIO = 560 / 449.75;
const styles = StyleSheet.create({
  image: {
    width: CHARACTER_WIDTH,
    height: CHARACTER_WIDTH * CHARACTER_ASPECT_RATIO,
  },
});

const Character = () => {
  return (
    <Svg style={styles.image}>
      <Image
        style={{ width: '100%', height: '100%' }}
        contentFit="contain"
        source={require('@/assets/DuolingoDragDrop/character.png')}
      />
    </Svg>
  );
};

export default Character;
