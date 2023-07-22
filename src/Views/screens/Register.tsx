import React from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";

import Input from "../components/Input";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import { ISignUp, signUpSchema } from "../../validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { NavigateApp } from "../../types/app";

const Register: React.FC<NavigateApp> = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const onSubmit = async (data: ISignUp) => {
    try {
      const { accessToken, message } = await register(data).unwrap();
      dispatch(setCredentials({ accessToken }));
      reset();
      Toast.show({
        type: "success",
        text1: message,
      });
      navigation.replace("Home");
    } catch (err: any) {
      if (!err.status) {
        Toast.show({
          type: "error",
          text1: "No Server Response",
        });
      } else if (err.status === 400) {
        Toast.show({
          type: "error",
          text1: "Please fill in all fields",
        });
      } else if (err.status === 401) {
        Toast.show({
          type: "error",
          text1: "User Already exist",
        });
      } else {
        Toast.show({
          type: "error",
          text1: err.data?.message,
        });
      }
    }
  };
  if (isLoading) return <Loader visible={isLoading} />;

  const onSignInPress = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Loader visible={isSubmitting} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 35, fontWeight: "bold" }}>
          Create an account
        </Text>

        <View
          style={{
            marginVertical: 20,
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <Input
            rules={{ required: true }}
            placeholder="First Name"
            control={control}
            name="firstName"
          />
          <Input placeholder="Last Name" control={control} name="lastName" />
          <Input
            rules={{ required: true }}
            placeholder="Enter Your email"
            control={control}
            name="email"
          />
          <Input
            rules={{ required: true }}
            placeholder="Password is at least 8 characters"
            control={control}
            name="password"
            secureTextEntry
          />
          <Input
            rules={{ required: true }}
            placeholder="Password is at least 8 characters"
            control={control}
            name="confirmPassword"
            secureTextEntry
          />
          <CustomButton text="Sign Up" onPress={handleSubmit(onSubmit)} />
          <CustomButton
            text="Have an account? Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
