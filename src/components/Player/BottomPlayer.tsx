import React, { useCallback } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";

import { View, Text } from "../Themed";
import { useSelector } from "react-redux";
import { RootStoreType } from "../../redux/rootReducer";
import { colors } from "../../constants/Colors";

const BottomPlayer = () => {
  const onPlayPausePress = useCallback(() => true, []);
  const getProgress = useCallback(() => "100", []);
  const { media, selectedTrackIndex, tabBarHeight } = useSelector(
    (state: RootStoreType) => ({
      media: state.mediaReducer.media,
      selectedTrackIndex: state.mediaReducer.selectedTrackIndex,
      tabBarHeight: state.layoutReducer.tabBarHeight,
    })
  );

  // if (!media) {
  //   return <></>;
  // }

  return (
    <View style={[styles.container, { bottom: tabBarHeight }]}>
      <View style={[styles.progress, { width: `${getProgress()}%` }]} />
      <View style={styles.row}>
        {/* <Image source={{ uri: song.imageUri }} style={styles.image} /> */}
        <View style={styles.rightContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode={"tail"}>
              {media?.title}
            </Text>
          </View>

          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={onPlayPausePress}>
              <FontAwesome
                // name={isPlaying ? "pause" : "play"}
                name={"play"}
                size={24}
                color={"white"}
              />
            </TouchableOpacity>
            <EvilIcons name="close" size={30} color="white" />
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
    backgroundColor: colors.black800,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.black600,
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
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
  },
});
