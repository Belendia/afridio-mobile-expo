import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-elements";
import { View, Text } from "./Themed";
import { colors } from "../constants/Colors";

type ErrorProps = {
  title: string;
  message: string;
  onRetry?: (() => void) | undefined;
};

const Error = ({ title, message, onRetry }: ErrorProps) => {
  let iconName = "warning";

  if (message === "Internet not reachable") {
    iconName = "disconnect";
  }
  return (
    <View style={styles.container}>
      <AntDesign name={iconName} size={150} color={colors.red300} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <Button
        title="Try Again"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "600" }}
        containerStyle={{ marginTop: 10 }}
        onPress={() => {
          if (onRetry) onRetry();
        }}
      />
    </View>
  );
};

export { Error };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black800,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.red300,
    marginTop: 30,
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: colors.red300,
    marginTop: 14,
    textAlign: "center",
    marginBottom: 20,
  },
});
