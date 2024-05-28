import { View, StyleSheet } from 'react-native';

import { Card } from '@/components/SwipeableTarotCard/Card';
import { useSharedValue } from 'react-native-reanimated';

const cards = [
  {
    source: require('@/assets/SwipeableTarotCards/death.png'),
  },
  {
    source: require('@/assets/SwipeableTarotCards/chariot.png'),
  },
  {
    source: require('@/assets/SwipeableTarotCards/high-priestess.png'),
  },
  {
    source: require('@/assets/SwipeableTarotCards/justice.png'),
  },
  {
    source: require('@/assets/SwipeableTarotCards/lover.png'),
  },
  {
    source: require('@/assets/SwipeableTarotCards/pendu.png'),
  },
  {
    source: require('@/assets/SwipeableTarotCards/tower.png'),
  },
  {
    source: require('@/assets/SwipeableTarotCards/strength.png'),
  },
];

const assets = cards.map((card) => card.source);

const SwipeableTarotCards = () => {
  const shuffleBack = useSharedValue<boolean>(false);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Card card={card} key={index} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});

export default SwipeableTarotCards;
