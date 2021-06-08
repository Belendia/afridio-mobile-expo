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
        leftIcon={<FontAwesome name="user" size={20} color="#ab9595" />}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        returnKeyType="next"
      />
      <Input
        placeholder="Phone number"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="phone" size={20} color="#ab9595" />}
        onChangeText={(text) => setPhoneNumber(text)}
        style={styles.input}
        keyboardType="phone-pad"
        returnKeyType="next"
      />

      <Input
        placeholder="Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color="#ab9595" />}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
        returnKeyType="next"
      />
      <Input
        placeholder="Confirm Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color="#ab9595" />}
        onChangeText={(text) => setSecondPassword(text)}
        style={styles.input}
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
  input: {
    color: "#ab9595",
  },
});
