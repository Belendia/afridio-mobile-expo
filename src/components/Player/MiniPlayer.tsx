import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AVPlaybackStatus } from "expo-av";
import { useDispatch, useSelector } from "react-redux";

import { View, Text } from "../Themed";
import { RootStoreType } from "../../redux/rootReducer";
import { colors } from "../../constants/Colors";
import {
  setMediaSlug,
  setPlayerState,
  setShowMiniPlayer,
} from "../../redux/slices";
import { navigate } from "../../services/navigation/NavigationService";
import { Cover } from "../Media/Cover";
import { Size } from "../../constants/Options";
import Player from "../../helpers/PlayerHelper";

const MiniPlayer = memo(() => {
  const dispatch = useDispatch();

  // const videoRef = useRef<Video>();
  // const [sound, setSound] = useState<Sound | null>(null);

  const {
    media,
    selectedTrackIndex,
    playerState,
    tabBarHeight,
    showMiniPlayer,
  } = useSelector((state: RootStoreType) => ({
    media: state.mediaReducer.media,
    selectedTrackIndex: state.mediaReducer.selectedTrackIndex,
    playerState: state.mediaReducer.playerState,
    showMiniPlayer: state.mediaReducer.showMiniPlayer,
    tabBarHeight: state.layoutReducer.tabBarHeight,
  }));

  const getProgress = useCallback(() => {
    if (
      playerState?.durationMillis === null ||
      playerState?.positionMillis === null
    ) {
      return 0;
    }

    return (playerState?.positionMillis / playerState?.durationMillis) * 100;
  }, [playerState]);

  useEffect(() => {
    // playCurrentMedia();
    if (media && showMiniPlayer) {
      console.log("Loading media");
      Player.load(media, selectedTrackIndex, false, onPlaybackStatusUpdate);
    }
  }, [media, selectedTrackIndex, showMiniPlayer]);

  const onCloseMiniPlayer = useCallback(() => {
    Player.unload();
    dispatch(setShowMiniPlayer(false));
  }, []);

  const onPressMiniPlayer = useCallback(() => {
    dispatch(setMediaSlug(media?.slug));
    navigate("MediaScreen", {
      slug: media?.slug,
    });
    dispatch(setShowMiniPlayer(false));
  }, [media?.slug]);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      dispatch(setPlayerState(status));
    }
  }, []);

  if (!media || showMiniPlayer === false) {
    return <></>;
  }

  return (
    <TouchableWithoutFeedback onPress={onPressMiniPlayer}>
      <View style={[styles.container, { bottom: tabBarHeight }]}>
        <View style={[styles.progress, { width: `${getProgress()}%` }]} />
        <View style={styles.row}>
          <Cover images={media?.images} size={Size.Small} />
          <View style={styles.rightContainer}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {media?.title}
              </Text>
            </View>

            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => Player.togglePlay()}>
                <Ionicons
                  name={playerState?.isPlaying ? "pause" : "play"}
                  size={30}
                  color={"white"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCloseMiniPlayer}>
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export { MiniPlayer };

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
    backgroundColor: colors.red800,
  },
  row: {
    flexDirection: "row",
  },
  player: {
    width: 100,
    height: 65,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer: {
    flex: 1,
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
