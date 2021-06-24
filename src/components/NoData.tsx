import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { colors } from "../constants/Colors";

const NoData = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="database-remove"
        size={150}
        color={colors.red300}
      />
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>No Data Found</Text>
    </View>
  );
};

export { NoData };

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
