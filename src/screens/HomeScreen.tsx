import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import PagerView from "react-native-pager-view";
import { FeaturedMediaCard } from "../components/Cards/FeaturedMediaCard";
import { useDispatch, useSelector } from "react-redux";

import { View } from "../components/Themed";
import HomeCategory from "../components/HomeCategory";
import { colors } from "../constants/Colors";
import { startToGetHomeScreenData } from "../redux/slices/homeSlice";
import { RootStoreType } from "../redux/rootReducer";
import { ProgressBar } from "../components";

const HomeScreen = () => {
  const dispatch = useDispatch();

  //redux
  const { loading, featuredMedias, nonFeaturedMedias, error } = useSelector(
    (state: RootStoreType) => ({
      loading: state.homeReducer.loading,
      featuredMedias: state.homeReducer.featuredMedias,
      nonFeaturedMedias: state.homeReducer.nonFeaturedMedias,
      error: state.homeReducer.error,
    })
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(startToGetHomeScreenData());
  };

  return loading ? (
    <ProgressBar />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={nonFeaturedMedias}
        renderItem={({ item }) => <HomeCategory key={item.id} {...item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={fetchData}
            colors={[colors.white]}
            tintColor={colors.red400}
            title="loading..."
            titleColor={colors.red400}
            progressBackgroundColor={colors.red400}
          />
        }
        ListHeaderComponent={
          featuredMedias &&
          featuredMedias.length > 0 &&
          featuredMedias[0].medias ? (
            <PagerView style={{ height: 248 }} overdrag={false}>
              {featuredMedias[0].medias.map((media) => (
                <FeaturedMediaCard key={media.slug} {...media} />
              ))}
            </PagerView>
          ) : (
            <></>
          )
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
