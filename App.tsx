import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Views/screens/Home";
import Login from "./src/Views/screens/Login";
import Register from "./src/Views/screens/Register";
import { AuthProvider } from "./src/context/AuthContext";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login">
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Login"
            component={Login}
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
    </AuthProvider>
  );
}
