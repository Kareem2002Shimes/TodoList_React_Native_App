import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../constants/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useState } from "react";
import { User } from "../../types/app";
import { login } from "../../utils/api";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;
const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [inputs, setInputs] = useState<User>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<User>({});
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await login(inputs);
      console.log(userData);
    }, 3000);
  };
  const handleOnchange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error: string | null, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <TouchableOpacity onPress={validate}>
            <Button title="Log In" />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ?{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
