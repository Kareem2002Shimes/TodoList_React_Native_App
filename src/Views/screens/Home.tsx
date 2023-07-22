import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

import Footer from "../components/Footer";

import { useGetTodosQuery } from "../../features/todos/todosApiSlice";
import Todo from "../components/Todo";
import useAuth from "../../hooks/useAuth";
import { NavigateApp } from "../../types/app";

const Home: React.FC<NavigateApp> = ({ navigation }) => {
  const { id } = useAuth();

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery(id, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <ActivityIndicator
        size="large"
        color={"blue"}
        style={{ marginTop: 30 }}
      />
    );

  if (isError) {
    content = (
      <View style={{ marginTop: 15 }}>
        <Text style={{ color: "red", textAlign: "center", fontWeight: "500" }}>
          {(error as any)?.data?.message}
        </Text>
      </View>
    );
  }
  if (isSuccess) {
    const { ids, entities } = todos;

    const todoListContent =
      ids?.length &&
      ids.map((todoId) => (
        <Todo
          key={todoId}
          todoId={todoId}
          completed={entities[todoId].completed}
          updatedAt={entities[todoId].updatedAt}
          createdAt={entities[todoId].createdAt}
          name={entities[todoId].name}
        />
      ));

    content = todoListContent;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.todoContainer}>{content}</View>
      <Footer />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todoContainer: {
    marginTop: 40,
  },
});
