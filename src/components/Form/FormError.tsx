import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View, Text } from "../Themed";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants/Colors";

type ErrorProps = {
  error: string;
  style?: ViewStyle | undefined;
};

const FormError = ({ error, style }: ErrorProps) => {
  return (
    <View style={[styles.errorWrapper, style]}>
      <MaterialIcons name="error-outline" size={20} color={colors.red400} />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export { FormError };

const styles = StyleSheet.create({
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
});
