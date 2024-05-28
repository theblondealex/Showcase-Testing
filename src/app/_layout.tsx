import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="DropdownMenu"
          options={{
            title: 'Dropdown Menu',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="VerticalMenuBar"
          options={{
            title: 'Vertical Menu Bar',
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
