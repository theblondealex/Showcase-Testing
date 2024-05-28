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
        <Drawer.Screen
          name="SwipeableTarotCards"
          options={{
            title: 'Swipeable Tarot Cards',
            headerShown: false,
          }}
        />
        {/* <Drawer.Screen
          name="RippleEffect"
          options={{
            title: 'Ripple Effect',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="PasswordDialTelephone"
          options={{
            title: 'Password Dial Telephone',
            headerShown: false,
          }}
        /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
}
