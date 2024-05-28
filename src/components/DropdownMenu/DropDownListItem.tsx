import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Color from 'color';

type antDesignIconName = keyof typeof AntDesign.glyphMap;

type DropDownItemType = {
  label: string;
  iconName: string;
};

type DropDownListItemProps = DropDownItemType & {
  index: number;
  dropdownItemsCount: number;
  isExpanded: Animated.SharedValue<boolean>;
};

const DropDownListItem: React.FC<DropDownListItemProps> = ({
  label,
  iconName,
  index,
  dropdownItemsCount,
  isExpanded,
}) => {
  const { width: WINDOW_WIDTH } = useWindowDimensions();
  const DropdownListItemHeight = 80;
  const Margin = 10;

  const FullDropDownHeight = dropdownItemsCount * (DropdownListItemHeight + Margin);

  const collapsedTop = FullDropDownHeight / 2 - DropdownListItemHeight / 2;
  const expandedTop = (DropdownListItemHeight + Margin) * index;

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.08;

  const expandedBackgroundColor = '#3e5390';
  const collapsedBackgroundColor = Color(expandedBackgroundColor)
    .lighten(index * 0.1)
    .hex();

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withSpring(
        isExpanded.value ? expandedBackgroundColor : collapsedBackgroundColor
      ),
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      transform: [
        {
          scale: withSpring(isExpanded.value ? expandedScale : collapsedScale),
        },
        {
          translateY: FullDropDownHeight / 2,
        },
      ],
    };
  }, []);

  const isHeader = index === 0;

  const rleftIconOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isHeader ? 1 : isExpanded.value ? 1 : 0),
    };
  }, []);

  const rHeaderArrowIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isHeader && isExpanded.value ? '90deg' : '0deg'),
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      onTouchEnd={() => {
        if (isHeader) isExpanded.value = !isExpanded.value;
      }}
      style={[
        {
          zIndex: dropdownItemsCount - index,
          position: 'absolute',
          width: WINDOW_WIDTH * 0.95,
          height: DropdownListItemHeight,
          borderRadius: 10,
        },
        rStyle,
      ]}>
      <View style={styles.containter}>
        <Animated.View style={[styles.iconContainer, { left: 20 }, rleftIconOpacityStyle]}>
          <AntDesign name={iconName as antDesignIconName} size={30} color="#3e5390" />
        </Animated.View>
        <Text style={styles.label}>{label}</Text>
        <Animated.View
          style={[
            styles.iconContainer,
            { right: 20, backgroundColor: 'transparent' },
            rHeaderArrowIconStyle,
          ]}>
          <MaterialIcons
            name={isHeader ? 'arrow-forward-ios' : 'arrow-forward'}
            size={30}
            color="#D4D4D4"
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};
export default DropDownListItem;

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    fontFamily: 'Roboto ',
    color: '#D4D4D4',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  iconContainer: {
    width: 40,
    aspectRatio: 1,
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: '#D4D4D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
