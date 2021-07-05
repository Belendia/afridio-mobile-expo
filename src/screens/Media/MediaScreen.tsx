import React, { useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { View } from "../../components/Themed";
import { RootStoreType } from "../../redux/rootReducer";
import { startToGetMedia } from "../../redux/slices/mediaSlice";
import {
  ProgressBar,
  Error,
  NoData,
  Content,
  VideoPlayer,
} from "../../components";

const MediaScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const { loading, media, error } = useSelector((state: RootStoreType) => ({
    loading: state.mediaReducer.loading,
    media: state.mediaReducer.media,
    error: state.mediaReducer.error,
  }));

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
        <VideoPlayer images={media?.images} track={media.tracks[0]} />
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
});
