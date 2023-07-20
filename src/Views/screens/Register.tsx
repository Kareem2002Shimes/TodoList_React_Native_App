import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import COLORS from "../../constants/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { RootStackParamList } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { User } from "../../types/app";
import { register } from "../../utils/api";
type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [inputs, setInputs] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<User>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();

    if (!inputs.email) {
      handleError("Please input email", "email");
      return false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      return false;
    }

    if (!inputs.firstName) {
      handleError("Please write your First Name", "firstName");
      return false;
    }
    if (!inputs.lastName) {
      handleError("Please write your Last Name", "lastName");
      return false;
    }

    if (!inputs.password || !inputs.confirmPassword) {
      handleError("Please input password", "password");
      return false;
    } else if (
      inputs.password.length < 8 ||
      inputs.confirmPassword.length < 8
    ) {
      handleError("Min password length of 8", "password");
      return false;
    }
    if (inputs.password !== inputs.confirmPassword) {
      handleError("Password Not Match", "");
      return false;
    }
  };

  const handlSubmit = () => {
    // setLoading(true);

    console.log(inputs);

    // setTimeout(async () => {
    //   try {
    //     setLoading(false);
    //     const res = await register(inputs);
    //     console.log(res);
    //     // navigation.navigate("Home");
    //   } catch (error) {
    //     Alert.alert("Error", "Something went wrong");
    //   }
    // }, 3000);
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
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "firstName")}
            onFocus={() => handleError(null, "firstName")}
            iconName="account-outline"
            label="First Name"
            placeholder="Enter your First Name"
            error={errors.firstName}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "lastName")}
            onFocus={() => handleError(null, "lastName")}
            iconName="account-outline"
            label="Last Name"
            placeholder="Enter your Last Name"
            error={errors.firstName}
          />
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
          <Input
            onChangeText={(text) => handleOnchange(text, "confirmPassword")}
            onFocus={() => handleError(null, "confirmPassword")}
            iconName="lock-outline"
            label="Confirm Password"
            placeholder="Enter your Confirm Password"
            error={errors.confirmPassword}
            password
          />
          <TouchableOpacity onPress={validate}>
            <Button title="Register" />
          </TouchableOpacity>

          <Text
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have account ?{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
