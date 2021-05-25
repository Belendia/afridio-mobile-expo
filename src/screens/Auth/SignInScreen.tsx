import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button, Divider } from "react-native-elements";
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
        returnKeyType="go"
      />
      <Button
        title="Sign In"
        buttonStyle={{
          backgroundColor: "#ed0400",
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "600" }}
        containerStyle={{ marginTop: 10 }}
        onPress={() => console.log("Handle Sign In")}
      />

      <Divider style={{ backgroundColor: "#363333", marginTop: 20 }} />
      <TouchableOpacity
        style={styles.footerTextWrapper}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={styles.footerWhiteText}>New to </Text>
        <Text style={styles.footerRedText}>Afridio?</Text>
        <Text style={styles.footerWhiteText}> Sign up now.</Text>
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
  footerRedText: {
    color: "#f74440",
    fontSize: 14,
    alignSelf: "center",
    fontWeight: "bold",
  },
  footerWhiteText: {
    color: "#fff",
    fontSize: 14,
    alignSelf: "center",
  },
});
