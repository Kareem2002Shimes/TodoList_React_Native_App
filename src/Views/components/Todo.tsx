import { EntityId } from "@reduxjs/toolkit";

import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../features/todos/todosApiSlice";
import { memo } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

type TodoProps = {
  todoId: EntityId;
  completed: boolean;
  updatedAt: Date;
  createdAt: Date;
  name: string;
};

const Todo = ({ todoId, completed, updatedAt, createdAt, name }: TodoProps) => {
  const [updateTodo, { isLoading, isSuccess, isError, error }] =
    useUpdateTodoMutation();
  const [
    deleteTodo,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteTodoMutation();

  if (createdAt && updatedAt) {
    const created = new Date(createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const onTodoClicked = async () => {
      const res: any = await updateTodo({
        id: todoId,
        completed: !completed,
      });
      Toast.show({
        type: "success",
        text1: res.data?.message,
      });
      console.log(res);
    };

    const onDeleteTodoClicked = async () => {
      const res: any = await deleteTodo({ id: todoId });
      Toast.show({
        type: "success",
        text1: res.data?.message,
      });
    };
    const errContent =
      ((error as any)?.data?.message || (delerror as any)?.data?.message) ?? "";
    if (errContent) {
      Toast.show({
        type: "error",
        text1: errContent,
      });
    }
    return (
      <View style={styles.listItem}>
        <View style={styles.item}>
          <Text
            onPress={onTodoClicked}
            style={[
              styles.item,
              completed
                ? { textDecorationLine: "line-through" }
                : { textDecorationLine: "none" },
            ]}
          >
            {name}
          </Text>

          <View style={styles.icons}>
            <TouchableOpacity onPress={onTodoClicked} style={styles.actionIcon}>
              <Icon
                name={completed ? "remove-done" : "done"}
                size={20}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDeleteTodoClicked}
              style={[styles.actionIcon, { backgroundColor: "red" }]}
            >
              <Icon name="delete" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ textTransform: "none", fontWeight: "bold" }}>
            CreatedAt: {created}
          </Text>
          <Text style={{ textTransform: "none", fontWeight: "bold" }}>
            UpdatedAt: {updated}
          </Text>
        </View>
      </View>
    );
  } else return null;
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 14,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3,
  },
  listItem: {
    padding: 20,
    elevation: 4.5,
    borderRadius: 7,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
const memoizedTodo = memo(Todo);

export default memoizedTodo;
