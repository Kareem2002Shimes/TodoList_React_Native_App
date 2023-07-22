import { TextInput, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Controller } from "react-hook-form";
type InputProps = {
  control: any;
  placeholder: string;
  name: string;
  secureTextEntry?: boolean;
  rules?: {};
};
const Input = ({
  control,
  placeholder,
  rules,
  name,
  secureTextEntry,
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState<boolean | undefined>(
    secureTextEntry
  );
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={hidePassword}
              style={styles.input}
            />
            {secureTextEntry && (
              <Icon
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                style={{
                  position: "absolute",
                  right: 20,
                  lineHeight: 50,
                  fontSize: 17,
                }}
                onPress={() => setHidePassword(!hidePassword)}
              />
            )}
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "relative",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    height: "100%",
  },
});

export default Input;
