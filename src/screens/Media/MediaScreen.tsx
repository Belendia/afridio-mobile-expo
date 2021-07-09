import React, { useEffect, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { View } from "../../components/Themed";
import { RootStoreType } from "../../redux/rootReducer";
import { setShowMiniPlayer, startToGetMedia } from "../../redux/slices";
import {
  ProgressBar,
  Error,
  NoData,
  Content,
  PlayerContainer,
  Backdrop,
} from "../../components";
import Player from "../../helpers/PlayerHelper";

const MediaScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { loading, media, selectedTrackIndex, playerState, error } =
    useSelector((state: RootStoreType) => ({
      loading: state.mediaReducer.loading,
      media: state.mediaReducer.media,
      selectedTrackIndex: state.mediaReducer.selectedTrackIndex,
      playerState: state.mediaReducer.playerState,
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
    dispatch(setShowMiniPlayer(false));
    return () => {
      dispatch(setShowMiniPlayer(true));
    };
  }, []);

  const onPausePlay = useCallback(() => Player.togglePlay(), []);

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
        <Backdrop images={media.images} />
      </View>
      <Content
        media={media}
        isPlaying={playerState?.isPlaying}
        onPlayPress={onPausePlay}
      />
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
