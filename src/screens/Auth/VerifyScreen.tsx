import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import OtpInputs from "react-native-otp-inputs";
import { Button, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { AuthContainer } from "../../components";
import { View, Text } from "../../components/Themed";
import { colors } from "../../constants/Colors";

const VerifyScreen = () => {
  const navigation = useNavigation();
  return (
    <AuthContainer
      showLogo={true}
      title={"Verification"}
      titleAlignCenter={true}
    >
      <Text style={styles.message}>
        Please type the verification code sent to
      </Text>
      <Text style={styles.phone}>+251911234567</Text>

      <View style={styles.otpWrapper}>
        <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={6}
          keyboardType="phone-pad"
          autofillFromClipboard={true}
          autofillListenerIntervalMS={3000}
          inputContainerStyles={styles.otpInputContainer}
          inputStyles={styles.otpInput}
        />
      </View>

      <Button
        title="Verify"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "600" }}
        containerStyle={{ marginTop: 10, marginBottom: 20 }}
        onPress={() => console.log("Handle Verify OTP")}
      />

      <Divider style={{ backgroundColor: colors.black700, marginTop: 20 }} />

      <View style={styles.resendTextWrapper}>
        <Text style={styles.resendWhiteText}>
          Didn't receive the verification code?{" "}
        </Text>
        <TouchableOpacity onPress={() => console.log("Resend code")}>
          <Text style={styles.resendRedText}>Resend again</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center",
  },
  phone: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "bold",
    alignSelf: "center",
  },
  otpWrapper: {
    backgroundColor: colors.black600,
    marginHorizontal: 20,
    marginVertical: 25,
  },
  otpInputContainer: {
    flex: 1,
    alignItems: "stretch",
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  otpInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.red800,
    color: colors.red300,
    fontSize: 30,
    fontWeight: "bold",
    borderWidth: 1.5,
    textAlign: "center",
  },
  resendTextWrapper: {
    marginVertical: 20,
    backgroundColor: colors.black600,
    flexDirection: "row",
    justifyContent: "center",
  },
  resendRedText: {
    color: colors.red400,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  resendWhiteText: {
    color: colors.red300,
    fontSize: 14,
    alignSelf: "center",
  },
});
