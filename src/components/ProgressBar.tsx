import React from "react";
import { View, ActivityIndicator, StyleSheet, Platform } from "react-native";

export const ProgressBar = () => (
  <View style={styles.progressBar}>
    <ActivityIndicator size="large" color="#EA0000" />
  </View>
);

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: "center",
  },
});
