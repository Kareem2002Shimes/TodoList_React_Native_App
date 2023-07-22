import { View, Text, SafeAreaView, Alert } from "react-native";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import axios from "axios";
import { BASE_URL } from "@env";
import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, loginSchema } from "../../validation/auth";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import Toast from "react-native-toast-message";
import { NavigateApp } from "../../types/app";

const Login: React.FC<NavigateApp> = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data: ILogin) => {
    try {
      const { accessToken, message } = await login(data).unwrap();
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
          text1: "Missing Email or Password",
        });
      } else if (err.status === 401) {
        Toast.show({
          type: "error",
          text1: "Unauthorized",
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

  const onSignUpPress = () => {
    navigation.navigate("Register");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader visible={isSubmitting} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 35, fontWeight: "bold" }}>
          Welcome Back!
        </Text>

        <View
          style={{ marginVertical: 20, width: "100%", paddingHorizontal: 20 }}
        >
          <Input
            rules={{ required: true }}
            placeholder="Enter your email"
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

          <CustomButton text="Sign In" onPress={handleSubmit(onSubmit)} />
          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
