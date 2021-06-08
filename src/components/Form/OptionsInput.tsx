import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../Themed";

export type Option = {
  key: string;
  value: string;
};

type OptionsInputProps = {
  title: string;
  values: Option[];
  defaultValue: Option;
  bottomDivider?: boolean | undefined;
  iconName: keyof typeof SimpleLineIcons.glyphMap;
  style?: ViewStyle | undefined;
  onPress?: ((option: Option) => void) | undefined;
};

const OptionsInput = ({
  title,
  values,
  defaultValue,
  bottomDivider,
  iconName,
  style,
  onPress,
}: OptionsInputProps) => {
  return (
    <View
      style={[
        styles.section,
        bottomDivider && {
          borderBottomColor: "#403838",
          borderBottomWidth: 0.5,
        },
      ]}
    >
      <View style={styles.content}>
        <SimpleLineIcons name={iconName} size={22} color="#ab9595" />

        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.group, style]}>
        {values.map((v, i) => (
          <TouchableOpacity
            style={[
              styles.button,
              styles.first,
              v.key === defaultValue.key ? styles.active : null,
            ]}
            key={i}
            onPress={() => onPress && onPress(v)}
          >
            <Text
              style={[
                styles.buttonText,
                v.key === defaultValue.key ? styles.activeText : null,
              ]}
            >
              {v.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

OptionsInput.defaultProps = {
  bottomDivider: true,
  keyboardType: "default",
};

export { OptionsInput };

const styles = StyleSheet.create({
  section: {
    flexDirection: "column",
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: "transparent",
  },
  content: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  title: {
    color: "#ab9595",
    fontSize: 16,
    marginLeft: 10,
  },
  group: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ed0400",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    padding: 8,
    alignContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500",
    color: "#ab9595",
  },
  active: {
    backgroundColor: "#ed0400",
    borderRadius: 14,
  },
  activeText: {
    color: "#FFF",
  },
  first: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  last: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  option: {
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
