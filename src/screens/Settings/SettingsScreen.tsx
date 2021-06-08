import React, { useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Text, View } from "../../components/Themed";
import {
  DateInput,
  EditableText,
  OptionsInput,
  Option,
} from "../../components";

const SettingsScreen = () => {
  const [sex, setSex] = useState<Option>({ key: "male", value: "Male" });

  const sexOptions: Option[] = [
    { key: "male", value: "Male" },
    { key: "female", value: "Female" },
  ];

  const moreOptions = [
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
  const moreOptionsLength = moreOptions.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>Account</Text>

        <View style={styles.card}>
          <View style={styles.inputsContainer}>
            <EditableText
              bottomDivider
              onChangeText={(text) => console.log(text)}
              title="Name"
              value="Belendia"
              iconName={"user"}
            />
            <DateInput
              title="Birth date"
              bottomDivider
              iconName={"event"}
              onSubmit={(date) => console.log(date)}
            />
            <EditableText
              bottomDivider
              onChangeText={(text) => console.log(text)}
              title="Phone"
              iconName={"phone"}
              keyboardType={"phone-pad"}
            />
            <OptionsInput
              title={"Sex"}
              iconName={"user-female"}
              values={sexOptions}
              bottomDivider={false}
              defaultValue={sex}
              style={{ marginLeft: 24 }}
              onPress={(selectedSex) => setSex(selectedSex)}
            />
          </View>
        </View>

        <Text style={styles.title}>More options</Text>
        <View style={styles.card}>
          {moreOptions.map((s, i) => (
            <ListItem
              key={i}
              bottomDivider={moreOptionsLength === i + 1 ? false : true}
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

  title: {
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
