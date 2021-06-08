import React, { useState } from "react";
import { StyleSheet, KeyboardType } from "react-native";
import { Divider, Input } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Text, View } from "../Themed";

type EditableTextProps = {
  title: string;
  value?: string | undefined;
  bottomDivider?: boolean | undefined;
  iconName: keyof typeof SimpleLineIcons.glyphMap;
  keyboardType?: KeyboardType | undefined;
  editable?: boolean | undefined;
  onChangeText?: ((text: string) => void) | undefined;
};

const EditableText = ({
  title,
  value,
  bottomDivider,
  iconName,
  keyboardType,
  editable,
  onChangeText,
}: EditableTextProps) => {
  const [editing, setEditing] = useState<boolean>(false);

  const renderEdit = () => {
    if (editing) {
      return (
        <Input
          keyboardType={keyboardType}
          defaultValue={value}
          onChangeText={(text) => onChangeText && onChangeText(text)}
        />
      );
    } else {
      return <Text style={styles.boldText}>{value}</Text>;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <SimpleLineIcons name={iconName} size={22} color="#ab9595" />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
            {renderEdit()}
          </View>
        </View>
        {editable && (
          <Text style={styles.buttonText} onPress={() => setEditing(!editing)}>
            {editing ? "Save" : "Edit"}
          </Text>
        )}
      </View>
      {bottomDivider && <Divider style={{ backgroundColor: "#403838" }} />}
    </>
  );
};

EditableText.defaultProps = {
  bottomDivider: true,
  editable: true,
  keyboardType: "default",
};

export { EditableText };

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
  buttonText: {
    fontWeight: "500",
    color: "#ed0400",
    marginRight: 12,
    backgroundColor: "transparent",
  },
  boldText: {
    fontWeight: "bold",
    color: "#7a4141",
  },
});
