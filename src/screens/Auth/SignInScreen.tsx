import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button, Divider } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "../../components/Themed";
import { AuthContainer, ProgressBar } from "../../components";
import { authStart } from "../../redux/slices/authSlice";
import { RootStoreType } from "../../redux/rootReducer";
import { colors } from "../../constants/Colors";

let SignInSchema = Yup.object().shape({
  phone_number: Yup.number()
    .typeError("Phone must be a number")
    .positive("Phone must be a positive number")
    .required("Required")
    .test(
      "len",
      "To short!",
      (value) =>
        value != undefined && value != null && value.toString().length >= 6
    ),
  password: Yup.string().min(6, "To short!").required("Required"),
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const password = useRef<typeof Input>(null);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: { phone_number: "", password: "", remember: true },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      dispatch(
        authStart({
          phone_number: "+" + values.phone_number,
          password: values.password,
        })
      );
    },
  });

  //redux
  const { authenticating, authenticated, error, readingToken } = useSelector(
    (state: RootStoreType) => ({
      authenticating: state.authReducer.authenticating,
      authenticated: state.authReducer.authenticated,
      error: state.authReducer.error,
      readingToken: state.authReducer.readingToken,
    })
  );

  return readingToken ? (
    <View style={styles.progressBar}>
      <ProgressBar />
    </View>
  ) : (
    <AuthContainer showLogo={true} title={"Sign In"}>
      <Input
        placeholder="251912345678"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="phone" size={20} color={colors.red300} />}
        onChangeText={handleChange("phone_number")}
        onBlur={handleBlur("phone_number")}
        errorMessage={errors.phone_number}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        keyboardType="phone-pad"
        returnKeyType="next"
        returnKeyLabel="Next"
        // onSubmitEditing={() => password.current?.focus()}
      />
      <Input
        // ref={password}
        placeholder="Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color={colors.red300} />}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("phone_number")}
        errorMessage={errors.password}
        style={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholderTextColor={colors.black700}
        secureTextEntry
        returnKeyType="go"
        returnKeyLabel="Go"
      />
      <Button
        title="Sign In"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "600" }}
        containerStyle={{ marginTop: 10 }}
        onPress={() => {
          if (!authenticating) handleSubmit();
        }}
        loading={authenticating}
      />
      {error && (
        <View style={styles.errorWrapper}>
          <MaterialIcons name="error-outline" size={20} color={colors.red400} />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <Divider style={{ backgroundColor: colors.black700, marginTop: 20 }} />
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
    color: colors.red400,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  footerWhiteText: {
    color: colors.red300,
    fontSize: 16,
    alignSelf: "center",
  },
  errorWrapper: {
    flexDirection: "row",
    backgroundColor: colors.black600,
    marginTop: 10,
  },
  error: {
    color: colors.red400,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 4,
  },
  progressBar: {
    backgroundColor: colors.black800,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: colors.red300,
  },
  inputContainer: {
    borderBottomColor: colors.red800,
  },
});
