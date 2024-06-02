import { Pressable, StyleSheet, Text, View } from 'react-native';
const Button = () => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>Activate the card</Text>
    </Pressable>
  );
};
export default Button;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 20,
    padding: 18,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
  },
});
