import { FlatList, StyleSheet, Text, View } from "react-native";
import ListItem from "../components/ListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useState } from "react";
import { ListItemProps } from "../../types/app";
import Footer from "../components/Footer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
type homeScreenProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
  const navigation = useNavigation<homeScreenProp>();

  const [todos, setTodos] = useState<ListItemProps[]>([
    { id: "asd", name: "asdas", completed: false, userId: "asd" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {todos?.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todos}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              id={item.id}
              completed={item.completed}
              userId={item.userId}
            />
          )}
        />
      ) : (
        <View style={{ padding: 20, paddingBottom: 100 }}>
          <Text
            style={{ fontSize: 14, fontWeight: "400", textAlign: "center" }}
          >
            There are no todos, add Some!
          </Text>
        </View>
      )}

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
});
