import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { ListItemProps } from "../../types/app";

const ListItem = ({ name, id, userId, completed }: ListItemProps) => {
  const markTodoComplete = (todoId: string) => {
    // update todo
  };
  const deleteTodo = (todoId: string) => {
    // delete todo
  };

  return (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: "#1f145c",
            textTransform: "capitalize",
            textDecorationLine: completed ? "line-through" : "none",
          }}
        >
          {name}
        </Text>
      </View>
      {!completed && (
        <TouchableOpacity
          style={styles.actionIcon}
          onPress={() => markTodoComplete(id)}
        >
          <Icon name="done" size={20} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.actionIcon, { backgroundColor: "red" }]}
        onPress={() => deleteTodo(id)}
      >
        <Icon name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "row",
    elevation: 4.5,
    borderRadius: 7,
    marginVertical: 10,
  },
});
export default ListItem;
