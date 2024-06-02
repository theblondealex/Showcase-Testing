import Button from '@/components/CardsCarousel/Button';
import Item from '@/components/CardsCarousel/Item';
import { CarouselData } from '@/data/CarouselData';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const CardsCarousel = () => {
  const width = useWindowDimensions().width;
  const x = useSharedValue(0);
  const ITEM_WIDTH = 250;
  const ITEM_HEIGHT = 400;
  const MARGIN_HORIZONTAL = 20;
  const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
  const SPACER = (width - ITEM_FULL_WIDTH) / 2;

  const onScroll = useAnimatedScrollHandler((event) => {
    x.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Choost a style that perfectly</Text>
        <Text style={styles.text}>reflects your personality</Text>
      </View>
      <Animated.FlatList
        onScroll={onScroll}
        ListHeaderComponent={<View />}
        ListFooterComponent={<View />}
        ListHeaderComponentStyle={{ width: SPACER }}
        ListFooterComponentStyle={{ width: SPACER }}
        data={CarouselData}
        keyExtractor={(item) => item.id + item.name}
        renderItem={({ item, index }) => {
          return (
            <Item
              item={item}
              index={index}
              width={ITEM_WIDTH}
              height={ITEM_HEIGHT}
              marginHorizontal={MARGIN_HORIZONTAL}
              x={x}
              fullWidth={ITEM_FULL_WIDTH}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        snapToInterval={ITEM_FULL_WIDTH}
      />
      <Button />
    </View>
  );
};
export default CardsCarousel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#111111',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '300',
  },
});
