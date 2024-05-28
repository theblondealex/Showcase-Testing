import { View, StyleSheet } from 'react-native';

import { Card } from '@/components/SwipeableTarotCard/Card';

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
  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Card card={card} key={index} index={index} />
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
