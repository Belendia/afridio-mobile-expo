import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, Input } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";
import DateField from "react-native-datefield";

import { Text, View } from "../Themed";

type EditableTextProps = {
  title: string;
  bottomDivider?: boolean | undefined;
  placeholderTextColor?: string | undefined;
  iconName: keyof typeof SimpleLineIcons.glyphMap;
  onSubmit?: ((value: Date) => void) | undefined;
};

const DateInput = ({
  title,
  bottomDivider,
  iconName,
  placeholderTextColor,
  onSubmit,
}: EditableTextProps) => {
  const date: Date = new Date();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <SimpleLineIcons name={iconName} size={22} color="#ab9595" />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            <DateField
              editable={true}
              styleInput={styles.border}
              maximumDate={
                new Date(date.getFullYear(), date.getMonth(), date.getDate())
              }
              minimumDate={new Date(1900, 1, 1)}
              placeholderTextColor={placeholderTextColor}
              handleErrors={() => console.log("ERROR")}
              onSubmit={(value: Date) => {
                if (onSubmit) onSubmit(value);
              }}
            />
          </View>
        </View>
      </View>
      {bottomDivider && <Divider style={{ backgroundColor: "#403838" }} />}
    </>
  );
};

DateInput.defaultProps = {
  bottomDivider: true,
  placeholderTextColor: "#ab9595",
};

export { DateInput };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 6,
    backgroundColor: "transparent",
  },
  content: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 10,
    flex: 1,
  },
  titleWrapper: {
    backgroundColor: "transparent",
    marginLeft: 12,
    justifyContent: "flex-start",
    flex: 1,
  },
  title: {
    color: "#ab9595",
    fontSize: 16,
    marginBottom: 10,
  },
  border: {
    width: "30%",
    borderRadius: 8,
    borderColor: "#ed0400",
    borderWidth: 1,
    marginBottom: 20,
    color: "#ab9595",
  },
});
