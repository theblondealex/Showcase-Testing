import Ripple from '@/components/RippleEffect/Ripple';
import { StyleSheet, Text, View } from 'react-native';

const RippleEffect = () => {
  return (
    <View style={styles.container}>
      <Ripple
        onTap={() => {
          console.log('tap');
        }}
        style={styles.ripple}>
        <Text style={{ fontSize: 20 }}>Tap</Text>
      </Ripple>
    </View>
  );
};
export default RippleEffect;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    //IOS
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    //Android
    elevation: 2,
  },
});
