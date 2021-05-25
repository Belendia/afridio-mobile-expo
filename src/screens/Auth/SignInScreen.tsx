import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { Text } from "../../components/Themed";
import { AuthContainer } from "../../components";

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthContainer showLogo={true} title={"Sign In"}>
      <Input
        placeholder="Phone number"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="phone" size={24} color="white" />}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={24} color="white" />}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        title="Sign In"
        buttonStyle={{
          backgroundColor: "#ed0400",
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 18, fontWeight: "bold" }}
        containerStyle={{ marginTop: 10 }}
        onPress={() => console.log("Handle Sign In")}
      />

      <TouchableOpacity style={styles.footerTextWrapper}>
        <Text style={styles.footerText}>New to Afridio? Sign up now.</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};

export default SignInScreen;

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
