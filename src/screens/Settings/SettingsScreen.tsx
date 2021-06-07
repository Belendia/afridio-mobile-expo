import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Divider, Input, ListItem } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Text, View } from "../../components/Themed";
const { width, height } = Dimensions.get("screen");

const SettingsScreen = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    phone: "",
    name: "",
    sex: "female",
    birthdate: "",
  });

  const settings = [
    {
      name: "Language",
      icon: "globe",
      chevron: true,
    },
    {
      name: "Change password",
      icon: "lock",
      chevron: true,
    },
    {
      name: "Log out",
      icon: "logout",
      chevron: false,
    },
  ];

  const handleEdit = (name: string, text: string) => {
    profile[name] = text;
  };

  const toggleEdit = (name: string) => {
    if (!editing) setEditing(name);
    else setEditing(null);
  };

  const renderEdit = (name: string) => {
    if (editing === name) {
      return (
        <Input
        // defaultValue={profile[name]}
        // onChangeText={(text) => handleEdit([name], text)}
        />
      );
    }

    // return <Text bold>{profile[name]}</Text>;
    return <Text style={styles.boldText}>Edited</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title1}>Account</Text>

        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputTitle}>Name</Text>
              {renderEdit("name")}
            </View>
            <Text style={styles.input} onPress={() => toggleEdit("name")}>
              {editing === "name" ? "Save" : "Edit"}
            </Text>
          </View>
          <Divider style={{ backgroundColor: "#403838" }} />

          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputTitle}>Birth date</Text>
              <Text style={styles.boldText}>{profile.birthdate}</Text>
            </View>
            <Text style={styles.input} onPress={() => toggleEdit("birthdate")}>
              {editing === "birthdate" ? "Save" : "Edit"}
            </Text>
          </View>
          <Divider style={{ backgroundColor: "#403838" }} />

          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.inputTitle}>Phone</Text>
              <Text style={styles.boldText}>{profile.phone}</Text>
            </View>
          </View>
          <Divider style={{ backgroundColor: "#403838" }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Sex</Text>

          <View style={styles.group}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.first,
                profile.sex === "male" ? styles.active : null,
              ]}
              onPress={() => true}
            >
              <Text
                style={[
                  styles.buttonText,
                  profile.sex === "male" ? styles.activeText : null,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                profile.sex === "female" ? styles.active : null,
              ]}
              onPress={() => true}
            >
              <Text
                style={[
                  styles.buttonText,
                  profile.sex === "female" ? styles.activeText : null,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.title1}>More options</Text>
        {settings.map((s, i) => (
          <ListItem
            key={i}
            bottomDivider
            containerStyle={{ borderColor: "#403838", marginHorizontal: 10 }}
          >
            <SimpleLineIcons name={s.icon} size={22} color="#ab9595" />
            <ListItem.Content>
              <ListItem.Title>
                <Text style={{ color: "#ab9595" }}>{s.name}</Text>
              </ListItem.Title>
            </ListItem.Content>
            {s.chevron && <ListItem.Chevron color="#ab9595" />}
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#211f1f",
  },
  section: {
    flexDirection: "column",
    marginHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: "#403838",
    borderBottomWidth: 0.5,
    // backgroundColor: "#211f1f",
  },
  title: {
    color: "#ab9595",
    fontSize: 16,
    marginVertical: 14,
    // backgroundColor: "#211f1f",
  },
  group: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ed0400",
    justifyContent: "space-between",
    // backgroundColor: "#211f1f",
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

  title1: {
    color: "#756565",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
    marginTop: 10,
  },
  inputs: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  inputTitle: {
    color: "#ab9595",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontWeight: "500",
    color: "#ed0400",
  },
  boldText: {
    fontWeight: "bold",
    color: "#7a4141",
  },
});
