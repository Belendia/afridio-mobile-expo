import React, { useEffect, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AVPlaybackStatusToSet, Video } from "expo-av";

import { View } from "../../components/Themed";
import { RootStoreType } from "../../redux/rootReducer";
import {
  setPlayerState,
  setShowMiniPlayer,
  startToGetMedia,
} from "../../redux/slices";
import {
  ProgressBar,
  Error,
  NoData,
  Content,
  PlayerContainer,
} from "../../components";
import { getPoster, getTrack } from "../../helpers/Utils";

const MediaScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const videoRef = useRef<Video>();

  const {
    loading,
    media,
    selectedTrackIndex,
    playerState,
    resumePlayback,
    error,
  } = useSelector((state: RootStoreType) => ({
    loading: state.mediaReducer.loading,
    media: state.mediaReducer.media,
    selectedTrackIndex: state.mediaReducer.selectedTrackIndex,
    playerState: state.mediaReducer.playerState,
    resumePlayback: state.mediaReducer.resumePlayback,
    error: state.mediaReducer.error,
  }));

  const fetchData = useCallback(() => {
    if (route.params?.slug) {
      dispatch(startToGetMedia(route.params?.slug));
    } else {
      navigation.goBack();
    }
  }, [route.params?.slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    return () => {
      dispatch(setShowMiniPlayer(true));
    };
  }, []);

  const playCurrentMedia = async () => {
    if (media && videoRef.current) {
      await videoRef.current?.loadAsync(
        getTrack(media.tracks, selectedTrackIndex),
        {
          shouldPlay: true,
          progressUpdateIntervalMillis: 1000,
          shouldCorrectPitch: true,
          isMuted: false,
          positionMillis:
            playerState && resumePlayback ? playerState.positionMillis : 0,
        }
      );
    }
  };

  useEffect(() => {
    playCurrentMedia();
  }, [media, selectedTrackIndex, videoRef.current]);

  if (error && typeof error === "string") {
    return <Error title={"Error"} message={error} onRetry={fetchData} />;
  }

  return loading ? (
    <PlayerContainer>
      <ProgressBar />
    </PlayerContainer>
  ) : media ? (
    <PlayerContainer>
      <View style={styles.bannerContainer}>
        <Video
          ref={videoRef}
          posterSource={getPoster(media?.images)}
          usePoster={true}
          style={styles.player}
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={(status: AVPlaybackStatusToSet) => {
            dispatch(setPlayerState(status));
          }}
          onError={(error) => {
            console.log(error);
          }}
        />
      </View>
      <Content media={media} />
    </PlayerContainer>
  ) : (
    <PlayerContainer>
      <NoData />
    </PlayerContainer>
  );
};

export default MediaScreen;

const styles = StyleSheet.create({
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  player: {
    height: 248,
    width: "100%",
  },
});
