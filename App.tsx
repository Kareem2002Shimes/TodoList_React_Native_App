import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Views/screens/Home";
import Login from "./src/Views/screens/Login";
import Register from "./src/Views/screens/Register";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import Toast from "react-native-toast-message";
import { useRefreshMutation } from "./src/features/auth/authApiSlice";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login">
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <RootStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
