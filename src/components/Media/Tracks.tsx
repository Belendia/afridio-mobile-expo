import React from "react";
import { StyleSheet, Platform } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { Text } from "../Themed";
import { colors } from "../../constants/Colors";
import { RootStoreType } from "../../redux/rootReducer";

const Tracks = () => {
  const { media } = useSelector((state: RootStoreType) => ({
    media: state.mediaReducer.media,
  }));

  return media?.tracks.map((item, index) => (
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
          <Text style={styles.title}>{item.name}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={styles.duration}>{item.duration}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <AntDesign name="clouddownloado" size={24} color={"gray"} />
    </ListItem>
  ));
};

export default Tracks;

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
