import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const router = useRouter();

  //on path change dismiss the other router
  // useEffect(() => {}, [pathname]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
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
            unmountOnBlur: true,
            title: 'Dropdown Menu',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="VerticalMenuBar"
          options={{
            unmountOnBlur: true,

            title: 'Vertical Menu Bar',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="SwipeableTarotCards"
          options={{
            unmountOnBlur: true,

            title: 'Swipeable Tarot Cards',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="RippleEffect"
          options={{
            title: 'Ripple Effect',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="NumberShake"
          options={{
            title: 'Number Shake',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="ColourPicker"
          options={{
            title: 'Colour Picker',
            headerShown: false,
          }}
        />

        {/* <Drawer.Screen
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
