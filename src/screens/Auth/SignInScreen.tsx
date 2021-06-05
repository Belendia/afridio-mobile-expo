import React, { useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button, Divider } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Text } from "../../components/Themed";
import { AuthContainer } from "../../components";
import {authStart, resetError} from '../../redux/slices/authSlice';
import { RootStoreType } from "../../redux/rootReducer";

let SignInSchema = Yup.object().shape({
  phone_number: Yup.number()
    .typeError('Phone must be a number')
    .positive('Phone must be a positive number')
    .required('Required')
    .test('len', 'To short!', (value) => value !=undefined && value !=null && value.toString().length >= 6),
  password: Yup.string().min(6, 'To short!').required('Required'),
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");
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
    initialValues: {phone_number: '', password: '', remember: true},
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      console.log("Values")
      console.log('+' + values.phone_number)
      dispatch(
        authStart({
          phone_number: '+' + values.phone_number,
          password: values.password,
        }),
      );
    },
  });

  //redux
  const {authenticating, authenticated, error} = useSelector((state: RootStoreType) => ({
    authenticating: state.authReducer.authenticating,
    authenticated: state.authReducer.authenticated,
    error: state.authReducer.error,
  }));
  
  useEffect(() => {
    console.log(error)
    if (error && error.hasOwnProperty('type') && error.type === 'text') {
      
    }

    return () => {
      
    };
  }, [error]);

  return (
    <AuthContainer showLogo={true} title={"Sign In"}>
      <Input
        placeholder="Phone number"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="phone" size={20} color="white" />}
        onChangeText={handleChange('phone_number')}
        errorMessage={errors.phone_number}
        keyboardType="phone-pad"
        returnKeyType="next"
        returnKeyLabel="Next"
        // onSubmitEditing={() => password.current?.focus()}
      />
      <Input
        // ref={password}
        placeholder="Password"
        leftIconContainerStyle={{ marginRight: 6 }}
        leftIcon={<FontAwesome name="lock" size={20} color="white" />}
        onChangeText={handleChange('password')}
        errorMessage={errors.password}
        secureTextEntry
        returnKeyType="go"
        returnKeyLabel="Go"
      />
      <Button
        title="Sign In"
        buttonStyle={{
          backgroundColor: "#ed0400",
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "600" }}
        containerStyle={{ marginTop: 10 }}
        onPress={() => handleSubmit()}
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
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  footerWhiteText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
});
