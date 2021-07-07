import React, { useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Video } from "expo-av";

import { View } from "../../components/Themed";
import { RootStoreType } from "../../redux/rootReducer";
import { startToGetMedia } from "../../redux/slices/mediaSlice";
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

  const { loading, media, selectedTrackIndex, error } = useSelector(
    (state: RootStoreType) => ({
      loading: state.mediaReducer.loading,
      media: state.mediaReducer.media,
      selectedTrackIndex: state.mediaReducer.selectedTrackIndex,
      error: state.mediaReducer.error,
    })
  );

  const fetchData = useCallback(() => {
    if (route.params?.slug) {
      dispatch(startToGetMedia(route.params?.slug));
    } else {
      navigation.goBack();
    }
  }, [route.params?.slug, dispatch, startToGetMedia]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
