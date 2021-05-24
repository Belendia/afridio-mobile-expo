import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { View, Text } from "../../components/Themed";

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled={Platform.OS === "ios"} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="always" bounces={false}>
          <Image
            source={require("../../../assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.signInText}>SignIn</Text>
          <View style={styles.formWrapper}>
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
              <Text style={styles.footerText}>
                New to Afridio? Sign up now.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#211f1f",
    // backgroundColor: "rgba(33, 31, 31, 0.7)",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    height: 100,
    width: 200,
    marginBottom: 10,
  },
  signInText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
    marginBottom: 20,
    marginHorizontal: 16,
  },
  formWrapper: {
    marginVertical: 0,
    marginHorizontal: 12,
    backgroundColor: "#211f1f",
  },
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
