import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Platform, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

import { View } from "../components/Themed";
import { ProgressBar, MediaListCard } from "../components";
import { colors } from "../constants/Colors";
import { RootStoreType } from "../redux/rootReducer";
import { startToGetMediaListByFormat } from "../redux/slices/mediaSlice";

const MediaListScreen = () => {
  const dispatch = useDispatch();
  const isLoading = false;
  const [isRefreshing, setIsRefresing] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const retrieveNextPage = () => {};

  const { mediaListByFormat, mediaListByFormatError } = useSelector(
    (state: RootStoreType) => ({
      mediaListByFormat: state.mediaReducer.mediaListByFormat,
      mediaListByFormatError: state.mediaReducer.mediaListByFormatError,
    })
  );

  const fetchData = useCallback(() => {
    if (route.params?.slug) {
      dispatch(startToGetMediaListByFormat(route.params?.slug));
    } else {
      navigation.goBack();
    }
  }, [route.params?.slug, dispatch, startToGetMediaListByFormat]);

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.progressBar}>
      <ProgressBar />
    </View>
  ) : (
    <FlatList
      style={styles.container}
      onEndReached={() => retrieveNextPage()}
      onEndReachedThreshold={1200}
      data={mediaListByFormat}
      renderItem={({ item }) => <MediaListCard key={item.slug} media={item} />}
      keyExtractor={(item) => item.slug}
      ListFooterComponent={() => (
        <View style={{ height: 50 }}>
          <ProgressBar />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          // onRefresh={this._onRefresh}
          colors={[colors.red900]}
          tintColor="white"
          title="loading..."
          titleColor="white"
          progressBackgroundColor="white"
        />
      }
    />
  );
};

export default MediaListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black800,
    ...Platform.select({
      ios: {
        paddingTop: 83,
      },
    }),
  },
  progressBar: {
    backgroundColor: colors.black800,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
