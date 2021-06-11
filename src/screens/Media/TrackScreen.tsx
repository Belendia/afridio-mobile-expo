import React from "react";
import { StyleSheet, Platform } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import { Text } from "../../components/Themed";
import movie from "../../../assets/data/movie";
import { colors } from "../../constants/Colors";

const TrackScreen = () => {
  return movie.seasons.items[0].episodes.items.map((item, index) => (
    <ListItem key={index}>
      <Avatar
        size="small"
        rounded
        title={(index + 1).toString()}
        titleStyle={{ color: colors.red300 }}
        avatarStyle={{
          borderWidth: 1,
          borderColor: colors.red300,

          ...Platform.select({
            android: {
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: 0,
            },
          }),
        }}
      />
      <ListItem.Content>
        <ListItem.Title>
          <Text style={styles.title}>{item.title}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={styles.duration}>{item.duration}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <AntDesign name="clouddownloado" size={24} color={"gray"} />
    </ListItem>
  ));
};

export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  title: {
    color: colors.red300,
  },
  duration: {
    color: colors.black300,
    fontSize: 13,
    fontStyle: "italic",
  },
});
