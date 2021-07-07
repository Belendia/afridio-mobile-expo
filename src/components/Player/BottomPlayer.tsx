import React, { useCallback } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { View, Text } from "../Themed";
import { useSelector } from "react-redux";
import { RootStoreType } from "../../redux/rootReducer";

const BottomPlayer = () => {
  const onPlayPausePress = useCallback(() => true, []);
  const getProgress = useCallback(() => "100", []);
  const { media, selectedTrackIndex } = useSelector((state: RootStoreType) => ({
    media: state.mediaReducer.media,
    selectedTrackIndex: state.mediaReducer.selectedTrackIndex,
  }));

  if (!media) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${getProgress()}%` }]} />
      <View style={styles.row}>
        {/* <Image source={{ uri: song.imageUri }} style={styles.image} /> */}
        <View style={styles.rightContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{media?.title}</Text>
            <Text
              style={styles.artist}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {media?.description}
            </Text>
          </View>

          <View style={styles.iconsContainer}>
            <Ionicons name="heart" size={30} color={"white"} />
            <TouchableOpacity onPress={onPlayPausePress}>
              <FontAwesome
                // name={isPlaying ? "pause" : "play"}
                name={"play"}
                size={30}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export { BottomPlayer };

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 79,
    backgroundColor: "#131313",
    width: "100%",
    borderWidth: 2,
    borderColor: "black",
  },
  progress: {
    height: 3,
    backgroundColor: "#bcbcbc",
  },
  row: {
    flexDirection: "row",
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    justifyContent: "space-around",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  artist: {
    color: "lightgray",
    fontSize: 18,
  },
});
