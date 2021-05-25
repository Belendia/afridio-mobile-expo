import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Text } from "../../components/Themed";
import { AuthContainer } from "../../components";

const SignInScreen = () => {
  const navigation = useNavigation();
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

      <TouchableOpacity
        style={styles.footerTextWrapper}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={styles.footer2Text}>New to </Text>
        <Text style={styles.footerText}>Afridio?</Text>
        <Text style={styles.footer2Text}> Sign up now.</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  footerTextWrapper: {
    marginVertical: 25,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#ed0400",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  footer2Text: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
});
