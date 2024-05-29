import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ScreensArray = [
  {
    name: 'Dropdown Menu',
    Route: 'DropdownMenu',
  },
  {
    name: 'Vertical Menu Bar',
    Route: 'VerticalMenuBar',
  },
  {
    name: 'Swipeable Tarot Cards',
    Route: 'SwipeableTarotCards',
  },
  {
    name: 'Ripple Effect',
    Route: 'RippleEffect',
  },
  {
    name: 'Number Shake',
    Route: 'NumberShake',
  },
  {
    name: 'Colour Picker',
    Route: 'ColourPicker',
  },
  // {
  //   name: 'Password Dial Telephone',
  //   Route: 'PasswordDialTelephone',
  // },
];

const renderItem = ({ item }: { item: (typeof ScreensArray)[0] }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      router.push(item.Route);
    }}>
    <Text style={styles.itemText}>{item.name}</Text>
  </TouchableOpacity>
);

const index = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Text style={styles.headerText}>Showcase Testing</Text>
        <Text style={styles.headerSubText}>
          Click the buttons below, or swiper to the left to see the drawer menu
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={ScreensArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#605c5c',
    paddingTop: 24,
    paddingHorizontal: 16,
    gap: 12,
  },
  list: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  item: {
    marginVertical: 6,
    padding: 18,
    backgroundColor: '#d4d4d4',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'light',
    color: '#3e5390',
    fontFamily: 'Roboto',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
    padding: 32,
    borderRadius: 8,
    width: '100%',
  },
  headerText: {
    fontSize: 48,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#3e5390',
    textAlign: 'center',
  },
  headerSubText: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Roboto',
    color: 'gray',
    textAlign: 'center',
  },
});

export default index;
