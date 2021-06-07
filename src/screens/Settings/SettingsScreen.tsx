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
import { EditableText } from "../../components";
const { width, height } = Dimensions.get("screen");

const SettingsScreen = () => {
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
  const settingLength = settings.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title1}>Account</Text>

        <View style={styles.card}>
          <View style={styles.inputsContainer}>
            <EditableText
              bottomDivider
              onChangeText={(text) => console.log(text)}
              title="Name"
              value="Belendia"
              iconName={"user"}
            />
            <EditableText
              bottomDivider
              onChangeText={(text) => console.log(text)}
              title="Birth date"
              iconName={"event"}
            />
            <EditableText
              bottomDivider
              onChangeText={(text) => console.log(text)}
              title="Phone"
              iconName={"phone"}
              keyboardType={"phone-pad"}
            />
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
        </View>

        <Text style={styles.title1}>More options</Text>
        <View style={styles.card}>
          {settings.map((s, i) => (
            <ListItem
              key={i}
              bottomDivider={settingLength === i + 1 ? false : true}
              containerStyle={{
                borderColor: "#403838",
                marginHorizontal: 10,
                backgroundColor: "transparent",
              }}
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
        </View>
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
  card: {
    borderRadius: 10,
    backgroundColor: "#211f1f",
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  section: {
    flexDirection: "column",
    marginHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: "#403838",
    borderBottomWidth: 0.5,
    backgroundColor: "transparent",
  },
  title: {
    color: "#ab9595",
    fontSize: 16,
    marginVertical: 14,
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

  title1: {
    color: "#756565",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 10,
  },
  inputsContainer: {
    marginHorizontal: 8,
    marginVertical: 12,
    backgroundColor: "transparent",
  },
});
