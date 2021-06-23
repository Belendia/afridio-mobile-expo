import React, { useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { FeaturedMediaCard } from "../components/Cards/FeaturedMediaCard";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@r0b0t3d/react-native-carousel";

import { View } from "../components/Themed";
import HomeCategory from "../components/HomeCategory";
import { colors } from "../constants/Colors";
import { startToGetHomeScreenData } from "../redux/slices/homeSlice";
import { RootStoreType } from "../redux/rootReducer";
import { ProgressBar } from "../components";
import { useSharedValue } from "react-native-reanimated";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const currentPage = useSharedValue(0);

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
            <Carousel
              style={{ height: 248 }}
              data={featuredMedias[0].medias}
              loop={true}
              autoPlay={true}
              duration={5000}
              inactiveOpacity={0.5}
              inactiveScale={0.9}
              firstItemAlignment="start"
              spaceBetween={20}
              animatedPage={currentPage}
              keyExtractor={(item) => item.slug}
              renderItem={({ item }) => {
                return <FeaturedMediaCard key={item.slug} {...item} />;
              }}
            />
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
