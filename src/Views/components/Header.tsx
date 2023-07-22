import { View, Text, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { useDeleteAllTodosMutation } from "../../features/todos/todosApiSlice";
import Toast from "react-native-toast-message";
import useAuth from "../../hooks/useAuth";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { useEffect } from "react";

type headerScreenProp = NativeStackNavigationProp<RootStackParamList>;

const Header = () => {
  const navigation = useNavigation<headerScreenProp>();
  const { id } = useAuth();

  const [deleteAllTodos, { isSuccess, isError, error }] =
    useDeleteAllTodosMutation();

  const [
    logout,
    {
      isLoading,
      isSuccess: logoutSuccess,
      isError: isLogoutError,
      error: errorLogout,
    },
  ] = useLogoutMutation();

  const cleartodos = () => {
    Alert.alert("Confirm", "Clear todo?", [
      {
        text: "Yes",
        onPress: async () => {
          const res: any = await deleteAllTodos({ userId: id });
          Toast.show({
            type: "success",
            text1: res.data?.message,
          });
        },
      },
      { text: "No" },
    ]);
  };

  const errContent =
    ((errorLogout as any)?.data?.message ||
      (isLogoutError as any)?.data?.message) ??
    "";
  const errDeleteALLContent =
    ((error as any)?.data?.message || (isError as any)?.data?.message) ?? "";
  if (errContent) {
    Toast.show({
      type: "error",
      text1: errContent,
    });
  }
  if (errDeleteALLContent) {
    Toast.show({
      type: "error",
      text1: errDeleteALLContent,
    });
  }

  useEffect(() => {
    if (logoutSuccess) navigation.push("Login");
  }, [logoutSuccess, navigation]);
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Todo App</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
        <Icon name="delete" size={25} color="red" onPress={cleartodos} />
        <Icon name="logout" size={25} color="red" onPress={logout} />
      </View>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f145c",
  },
});
export default Header;
