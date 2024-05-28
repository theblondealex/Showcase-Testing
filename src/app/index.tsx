import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ScreensArray = [
  {
    name: 'Dropdown Menu',
    Route: 'DropdownMenu',
  },
  {
    name: 'Duolingo Drag and Drop',
    Route: 'DuolingoDragDrop',
  },
  {
    name: 'Vertical Menu Bar',
    Route: 'VerticalMenuBar',
  },
];

const index = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        {ScreensArray.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.item}
            onPress={() => {
              router.push(item.Route);
            }}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#605c5c',
    padding: 26,
    gap: 14,
  },
  item: {
    marginVertical: 8,
    padding: 12,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default index;
