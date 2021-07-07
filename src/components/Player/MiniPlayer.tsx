import React, { useCallback, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { AVPlaybackStatus, Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";

import { View, Text } from "../Themed";
import { RootStoreType } from "../../redux/rootReducer";
import { colors } from "../../constants/Colors";
import { getPoster, getTrack } from "../../helpers/Utils";
import {
  setMediaSlug,
  setPlayerState,
  setResumePlayback,
  setShowMiniPlayer,
} from "../../redux/slices";
import { navigate } from "../../services/navigation/NavigationService";

const MiniPlayer = () => {
  const dispatch = useDispatch();

  const videoRef = useRef<Video>();

  const onPlayPausePress = async () => {
    if (videoRef.current) {
      if (playerState?.isPlaying) {
        await videoRef.current?.pauseAsync();
      } else {
        await videoRef.current?.playAsync();
      }
    }
  };

  const getProgress = useCallback(() => "100", []);

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

  const playCurrentMedia = async () => {
    if (media && videoRef.current && showMiniPlayer) {
      await videoRef.current?.loadAsync(
        getTrack(media.tracks, selectedTrackIndex),
        {
          shouldPlay: true,
          progressUpdateIntervalMillis: 1000,
          shouldCorrectPitch: true,
          isMuted: playerState ? playerState.isMuted : false,
          positionMillis: playerState ? playerState.positionMillis : 0,
        }
      );
    }
  };

  useEffect(() => {
    playCurrentMedia();
  }, [media, selectedTrackIndex, videoRef.current, showMiniPlayer]);

  const onCloseMiniPlayer = useCallback(() => {
    dispatch(setResumePlayback(false));
    dispatch(setShowMiniPlayer(false));
  }, []);

  const onPressMiniPlayer = useCallback(() => {
    dispatch(setMediaSlug(media?.slug));
    navigate("MediaScreen", {
      slug: media?.slug,
    });
    dispatch(setResumePlayback(true));
    dispatch(setShowMiniPlayer(false));
  }, [media?.slug]);

  if (!media || showMiniPlayer === false) {
    return <></>;
  }

  return (
    <TouchableWithoutFeedback onPress={onPressMiniPlayer}>
      <View style={[styles.container, { bottom: tabBarHeight }]}>
        <View style={[styles.progress, { width: `${getProgress()}%` }]} />
        <View style={styles.row}>
          <Video
            ref={videoRef}
            posterSource={getPoster(media?.images)}
            usePoster={true}
            style={styles.player}
            resizeMode="contain"
            onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
              dispatch(setPlayerState(status));
            }}
            onError={(error) => {
              console.log(error);
            }}
          />
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
              <TouchableOpacity onPress={onPlayPausePress}>
                <Ionicons
                  name={
                    playerState?.isPlaying || playerState?.isBuffering
                      ? "pause"
                      : "play"
                  }
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
};

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
    backgroundColor: "#bcbcbc",
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
