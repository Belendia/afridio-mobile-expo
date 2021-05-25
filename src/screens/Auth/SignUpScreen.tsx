import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { AuthContainer } from "../../components";

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
        leftIcon={<FontAwesome name="user" size={20} color="white" />}
        onChangeText={(text) => setName(text)}
        returnKeyType="next"
      />
      <Input
        placeholder="Phone number"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="phone" size={20} color="white" />}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
        returnKeyType="next"
      />

      <Input
        placeholder="Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color="white" />}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        returnKeyType="next"
      />
      <Input
        placeholder="Confirm Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color="white" />}
        onChangeText={(text) => setSecondPassword(text)}
        secureTextEntry
        returnKeyType="go"
      />
      <Button
        title="Register"
        buttonStyle={{
          backgroundColor: "#ed0400",
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
  footerTextWrapper: {
    marginVertical: 25,
    marginHorizontal: 0,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
});
