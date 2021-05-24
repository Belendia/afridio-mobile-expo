import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/Auth/SignInScreen";

import { AuthParamList } from "../../types";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName="LogInScreen">
      <AuthStack.Screen name="LogInScreen" component={SignInScreen} />

      {/* <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
      />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name="PasswordChangedScreen"
        component={PasswordChangedScreen}
      /> */}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
