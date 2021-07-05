import React, { useRef, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AVPlaybackStatusToSet, Video } from "expo-av";

import { Track, Image } from "../../../types";
import { View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";

type VideoPlayerProps = {
  images: Image[] | undefined;
  track: Track;
};

const VideoPlayer = ({ images, track }: VideoPlayerProps) => {
  const video = useRef(null);
  const [status, setStatus] = useState<AVPlaybackStatusToSet>();

  let player = (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{
          uri: track.file_url,
        }}
        posterSource={require("../../../assets/images/backdrop.png")}
        usePoster={true}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );

  if (images && images?.length > 0) {
    const poster = images?.filter((img) => img.width === 500);
    if (poster && poster.length > 0 && poster[0].image) {
      player = (
        <Video
          ref={video}
          source={{
            uri: track.file_url,
          }}
          posterSource={{ uri: poster[0].image }}
          usePoster={true}
          style={styles.player}
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={(status) => {
            console.log(status);
            setStatus(() => status);
          }}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonPlay}>
        <TouchableWithoutFeedback
          onPress={() =>
            status?.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          {status?.isPlaying ? (
            <Ionicons
              style={styles.iconPlay}
              name="pause-circle-outline"
              size={90}
              color="white"
            />
          ) : (
            <Ionicons
              style={styles.iconPlay}
              name="play-circle-outline"
              size={90}
              color="white"
            />
          )}
        </TouchableWithoutFeedback>
      </View>
      {player}
    </View>
  );
};

export { VideoPlayer };

const styles = StyleSheet.create({
  container: {
    height: 248,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  player: {
    height: 248,
    width: "100%",
  },
  buttonPlay: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
  },
  iconPlay: {
    opacity: 0.8,
    backgroundColor: "transparent",
  },
});
