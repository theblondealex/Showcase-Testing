import { StyleSheet, Text, View } from 'react-native';
const NumberShake = () => {
  return (
    <View style={styles.container}>
      <Text>NumberShake</Text>
    </View>
  );
};
export default NumberShake;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
