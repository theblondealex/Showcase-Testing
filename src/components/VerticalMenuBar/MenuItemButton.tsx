import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUTTONS_LIST } from '@/Utils/VerticalMenuBar/Buttons';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type MaterialIconsProps = keyof typeof MaterialCommunityIcons.glyphMap;

type MenuItemButtonProps = {
  item: {
    title: string;
    icon: string;
    color: string;
  };
  index: number;
  offset: SharedValue<number>;
  activeY: SharedValue<number>;
};

const MenuItemButton: React.FC<MenuItemButtonProps> = ({ item, index, offset, activeY }) => {
  const ITEM_HEIGHT = 50 + 16;
  const TOOLBAR_HEIGHT = ITEM_HEIGHT * 7 + 16;
  const TOTAL_HEIGHT = ITEM_HEIGHT * BUTTONS_LIST.length + 16;

  const itemEndPos = (index + 1) * ITEM_HEIGHT + 8;
  const itemStartPos = itemEndPos - ITEM_HEIGHT;

  const isItemActive = useDerivedValue(() => {
    const pressedPoint = activeY.value + offset.value;
    const isValid = pressedPoint >= itemStartPos && pressedPoint <= itemEndPos;

    return activeY.value !== 0 && isValid;
  }, [activeY]);

  const viewStyle = useAnimatedStyle(() => {
    const endScrollLimit = TOTAL_HEIGHT - TOOLBAR_HEIGHT;
    const isItemOutofView =
      itemEndPos < offset.value || itemStartPos > offset.value + TOOLBAR_HEIGHT;

    return {
      width: withSpring(isItemActive.value ? 150 : 50, { damping: 10 }),
      top:
        offset.value < 0
          ? ((index + 1) * Math.abs(offset.value)) / 5
          : offset.value > endScrollLimit
            ? (-(BUTTONS_LIST.length - index + 1) * Math.abs(offset.value - endScrollLimit)) / 5
            : 0,
      transform: [
        {
          translateX: withTiming(isItemActive.value ? 30 : 0, {
            duration: 250,
            easing: Easing.out(Easing.quad),
          }),
        },
        {
          scale: withTiming(
            isItemActive.value ? 1.2 : isItemOutofView ? 0.2 : 1,

            {
              duration: 250,
              easing: Easing.out(Easing.quad),
            }
          ),
        },
      ],
    };
  }, []);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isItemActive.value ? 1 : 0, {
        duration: 250,
      }),
    };
  }, []);

  return (
    <Animated.View
      style={[styles.buttonContainer, { backgroundColor: item.color }, viewStyle]}
      key={`${item.title}-${index}`}>
      <MaterialCommunityIcons name={item.icon as MaterialIconsProps} size={24} color="#fff" />
      <Animated.Text style={[styles.buttonTitle, rTextStyle]}>{item.title}</Animated.Text>
    </Animated.View>
  );
};
export default MenuItemButton;
const styles = StyleSheet.create({
  buttonContainer: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonTitle: {
    opacity: 0,
    marginLeft: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
