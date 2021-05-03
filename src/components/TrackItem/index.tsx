import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "../Themed";

interface TrackItemProps {
  episode: {
    id: string;
    title: string;
    poster: string;
    duration: string;
    plot: string;
    video: string;
  };
  index: string;
}

const TrackItem = (props: TrackItemProps) => {
  const { episode, index } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar
          size="small"
          rounded
          title={index}
          avatarStyle={{
            borderWidth: 2,
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{episode.title}</Text>
          <Text style={styles.duration}>{episode.duration}</Text>
        </View>
        <AntDesign name="clouddownloado" size={24} color={"white"} />
      </View>
    </View>
  );
};

export default TrackItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingBottom: 10,
    borderBottomColor: "#191919",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  title: {},
  duration: {
    color: "darkgray",
    fontSize: 10,
  },
  plot: {
    color: "darkgray",
    paddingLeft: 5,
  },
});
