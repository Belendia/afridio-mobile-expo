import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import * as React from "react";
import { ColorSchemeName } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import RootNavigator from "./RootNavigator";
import AuthNavigator from "./AuthNavigator";
import useAutoLogin from "../hooks/useAutoLogin";
import { useSelector } from "react-redux";
import { RootStoreType } from "../redux/rootReducer";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  useAutoLogin();

  const { token } = useSelector((state: RootStoreType) => ({
    token: state.authReducer.token,
  }));

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {token ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
