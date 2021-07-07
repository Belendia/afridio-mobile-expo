import React, { useEffect, useCallback } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Constants from "expo-constants";
import { Video } from "expo-av";

import { View } from "../Themed";
import { RootStoreType } from "../../redux/rootReducer";
import { startToGetMedia } from "../../redux/slices/mediaSlice";
import { getPoster, getTrack } from "../../helpers/Utils";
import { ProgressBar } from "../ProgressBar";
import { Content } from "../Media/Content";
import { NoData } from "../NoData";
import { Error } from "../Error";

type ContextType = {
  translateY: number;
};

const MediaPlayer = () => {
  const dispatch = useDispatch();

  const { loading, media, selectedTrackIndex, selectedMediaSlug, error } =
    useSelector((state: RootStoreType) => ({
      loading: state.mediaReducer.loading,
      media: state.mediaReducer.media,
      selectedTrackIndex: state.mediaReducer.selectedTrackIndex,
      selectedMediaSlug: state.mediaReducer.selectedMediaSlug,
      error: state.mediaReducer.error,
    }));

  const fetchData = useCallback(() => {
    if (selectedMediaSlug) {
      dispatch(startToGetMedia(selectedMediaSlug));
    }
  }, [selectedMediaSlug, dispatch, startToGetMedia]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error && typeof error === "string") {
    return <Error title={"Error"} message={error} onRetry={fetchData} />;
  }

  return loading ? (
    <ProgressBar />
  ) : media ? (
    <View style={{ backgroundColor: "transparent" }}>
      <View style={styles.bannerContainer}>
        <Video
          source={getTrack(media.tracks, selectedTrackIndex)}
          posterSource={getPoster(media?.images)}
          usePoster={true}
          style={styles.player}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            // console.log(status);
            // setStatus(() => status);
          }}
        />
      </View>
      <Content media={media} />
    </View>
  ) : (
    <></>
  );
};

export { MediaPlayer };

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
    marginTop: 40,
    height: 248,
    width: "100%",
  },
});
