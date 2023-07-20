import { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Footer = () => {
  const [textInput, setTextInput] = useState<string>("");
  const addTodo = () => {};

  return (
    <View style={styles.footer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Todo"
          onChangeText={(text) => setTextInput(text)}
          value={textInput}
        />
      </View>
      <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer}>
          <Icon name="add" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    color: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    elevation: 40,
    flex: 1,
    height: 50,
    justifyContent: "center",
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#1f145c",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Footer;
