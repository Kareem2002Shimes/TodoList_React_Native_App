import { BASE_URL } from "@env";
import axios from "axios";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAddNewTodoMutation } from "../../features/todos/todosApiSlice";
import useAuth from "../../hooks/useAuth";

const Footer = () => {
  const { id } = useAuth();
  const [textInput, setTextInput] = useState<string>("");
  const [addNewTodo, { isLoading, isSuccess, isError, error }] =
    useAddNewTodoMutation();

  const addTodo = async () => {
    if (textInput) {
      const res: any = await addNewTodo({
        name: textInput,
        userId: id,
      });

      Toast.show({
        type: "success",
        text1: res.data?.message,
      });
      setTextInput("");
    } else {
      Toast.show({
        type: "info",
        text1: "Are your added todo name?",
      });
    }
  };
  const errContent = (error as any)?.data?.message;
  if (errContent) {
    Toast.show({
      type: "error",
      text1: errContent,
    });
  }
  return (
    <View style={styles.footer}>
      <Text style={{ color: "red" }}></Text>
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
