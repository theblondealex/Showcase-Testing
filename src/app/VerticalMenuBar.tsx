import { BUTTONS_LIST } from '@/Utils/VerticalMenuBar/Buttons';
import MenuItemButton from '@/components/VerticalMenuBar/MenuItemButton';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ITEM_HEIGHT = 50 + 16;
const TOOLBAR_HEIGHT = ITEM_HEIGHT * 7 + 16;
const TOTAL_HEIGHT = ITEM_HEIGHT * BUTTONS_LIST.length + 16;

const VerticalMenuBar = () => {
  const activeY = useSharedValue(0);
  const scrollOffset = useSharedValue(0);

  const dragGesture = Gesture.Pan()
    .activateAfterLongPress(200)
    .onStart((e) => {
      activeY.value = e.y;
    })
    .onUpdate((e) => {
      activeY.value = e.y;
    })
    .onEnd((e) => {
      activeY.value = 0;
    });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollOffset.value = event.contentOffset.y;
  });

  return (
    <>
      <Drawer.Screen
        options={{
          title: 'Vertical Menu Bar',
          headerShown: false,
        }}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View>
            <View style={styles.toolbarView} />
            <GestureDetector gesture={dragGesture}>
              <Animated.FlatList
                style={styles.buttonListView}
                contentContainerStyle={{ padding: 8 }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                data={BUTTONS_LIST}
                keyExtractor={(item, index) => `${item.title}-${index}`}
                renderItem={({ item, index }) => (
                  <MenuItemButton
                    item={item}
                    offset={scrollOffset}
                    activeY={activeY}
                    index={index}
                    key={`${item.title}-${index}`}
                  />
                )}
              />
            </GestureDetector>
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee9e9',
  },
  toolbarView: {
    width: 50 + 16,
    height: TOOLBAR_HEIGHT,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 40,
    elevation: 32,
  },
  buttonListView: {
    position: 'absolute',
    height: TOOLBAR_HEIGHT,
    width: '100%',
    marginHorizontal: 24,
    marginVertical: 40,
    elevation: 32,
  },
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
    marginLeft: 12,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerticalMenuBar;
