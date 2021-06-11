import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { AuthContainer, DateInput, OptionsInput } from "../../components";
import { SexOptions } from "../../constants/Options";
import { colors } from "../../constants/Colors";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  return (
    <AuthContainer showLogo={true} title={"Sign Up"}>
      <Input
        placeholder="Name"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="user" size={20} color={colors.red300} />}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        returnKeyType="next"
      />
      <Input
        placeholder="Phone number"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="phone" size={20} color={colors.red300} />}
        onChangeText={(text) => setPhoneNumber(text)}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        keyboardType="phone-pad"
        returnKeyType="next"
      />
      <DateInput
        title="Birth date"
        bottomDivider={false}
        iconName={"event"}
        onSubmit={(date) => console.log(date)}
      />
      <OptionsInput
        title={"Sex"}
        iconName={"user-female"}
        values={SexOptions}
        bottomDivider={false}
        onPress={(selectedSex) => console.log(selectedSex)}
      />
      <Input
        placeholder="Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color={colors.red300} />}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        secureTextEntry
        returnKeyType="next"
      />
      <Input
        placeholder="Confirm Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color={colors.red300} />}
        onChangeText={(text) => setSecondPassword(text)}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        secureTextEntry
        returnKeyType="go"
      />
      <Button
        title="Register"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "600" }}
        containerStyle={{ marginTop: 10, marginBottom: 20 }}
        onPress={() => console.log("Handle Sign Up")}
      />
    </AuthContainer>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    color: colors.red300,
  },
  inputContainer: {
    borderBottomColor: colors.red800,
  },
});
