import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { RouteProp } from "@react-navigation/native";

export type Todo = {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type NavigateApp = {
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
  route: RouteProp<RootStackParamList, any>;
};
