import { View, Text, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Header = () => {
  const cleartodos = () => {
    Alert.alert("Confirm", "Clear todo?", [
      {
        text: "Yes",
        onPress: () => "",
      },
      { text: "No" },
    ]);
    // clear all todos
  };
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Todo App</Text>
      <Icon name="delete" size={25} color="red" onPress={cleartodos} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f145c",
  },
});
export default Header;
