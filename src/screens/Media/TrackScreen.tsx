import React from "react";
import { StyleSheet, Platform } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import movie from "../../../assets/data/movie";

const TrackScreen = () => {
  return movie.seasons.items[0].episodes.items.map((item, index) => (
    <ListItem key={index}>
      <Avatar
        size="small"
        rounded
        title={(index + 1).toString()}
        avatarStyle={{
          borderWidth: 1,
          borderColor: "gray",
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
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.duration}</ListItem.Subtitle>
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
});