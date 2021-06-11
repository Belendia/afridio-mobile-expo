import React from "react";
import { View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import { colors } from "../constants/Colors";

export const ProgressBar = () => (
  <View style={styles.progressBar}>
    <ActivityIndicator size="large" color={colors.red900} />
  </View>
);

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: "center",
  },
});
