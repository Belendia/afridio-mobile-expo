import React, { useEffect, useCallback } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Animated, { Easing, useSharedValue } from "react-native-reanimated";
import Constants from "expo-constants";
import { Video } from "expo-av";

import { View } from "../../components/Themed";
import { RootStoreType } from "../../redux/rootReducer";
import { startToGetMedia } from "../../redux/slices/mediaSlice";
import { ProgressBar, Error, NoData, Content } from "../../components";
import { getPoster, getTrack } from "../../helpers/Utils";

const {
  Extrapolate,
  Value,
  Clock,
  cond,
  eq,
  set,
  add,
  sub,
  multiply,
  lessThan,
  clockRunning,
  startClock,
  spring,
  stopClock,
  event,
  interpolate,
  timing,
  neq,
} = Animated;

const { width, height } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const minHeight = 64;
const midBound = height - 64 * 3;
const upperBound = midBound + minHeight;
const AnimatedVideo = Animated.createAnimatedComponent(Video);

const MediaScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const finished = useSharedValue(0);
  const velocity = useSharedValue(0);
  const position = useSharedValue(0);
  const time = useSharedValue(0);

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
    <ProgressBar />
  ) : media ? (
    <>
      <View style={styles.bannerContainer}>
        <AnimatedVideo
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
    </>
  ) : (
    <NoData />
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
