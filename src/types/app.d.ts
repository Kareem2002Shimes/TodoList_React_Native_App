import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

export type Todo = {
  id: string;
  name: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type NavigateApp = {
  navigation: NativeStackNavigationProp<RootStackParamList, string>;
  route: RouteProp<RootStackParamList, string>;
};
