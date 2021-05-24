import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { View, Text } from "../../components/Themed";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled={Platform.OS === "ios"} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="always">
          <View>
            <Image
              source={require("../../../assets/images/icon.png")}
              style={styles.logo}
            />

            <Input
              placeholder="Phone number"
              leftIcon={<FontAwesome name="phone" size={24} color="white" />}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="phone-pad"
            />
            <Input
              placeholder="Phone number"
              leftIcon={<FontAwesome name="lock" size={24} color="white" />}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />

            <Button
              title="Sign In"
              buttonStyle={{ backgroundColor: "#ed0400" }}
              onPress={() => console.log("Handle Sign In")}
            />

            <TouchableOpacity>
              <Text>New to Afridio? Sign up now.</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: 100,
    height: 75,
    zIndex: 1,
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: rgba(33, 31, 31, 0.7),
  },
  form: {
    marginVertical: 0,
    marginHorizontal: 5,
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
  },
});
