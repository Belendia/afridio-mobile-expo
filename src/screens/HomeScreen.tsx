import * as React from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import Swiper from "react-native-swiper";
import { FeaturedMediaCard } from "../components/Cards/FeaturedMediaCard";

import { View } from "../components/Themed";
import HomeCategory from "../components/HomeCategory";
import categories from "../../assets/data/categories";
import { colors } from "../constants/Colors";

const HomeScreen = () => {
  const featuredMovies = categories.items.filter(
    (item) => item.title === "Featured"
  );
  const allExceptFeaturedMovies = categories.items.filter(
    (item) => item.title !== "Featured"
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={allExceptFeaturedMovies}
        renderItem={({ item }) => <HomeCategory category={item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            // onRefresh={this._onRefresh}
            colors={[colors.white]}
            tintColor={colors.red400}
            title="loading..."
            titleColor={colors.red400}
            progressBackgroundColor={colors.red400}
          />
        }
        ListHeaderComponent={
          featuredMovies !== null && featuredMovies.length > 0 ? (
            <Swiper
              autoplay
              autoplayTimeout={4}
              showsPagination={false}
              height={248}
            >
              {featuredMovies[0].movies.map((movie) => (
                <FeaturedMediaCard key={movie.id} movie={movie} />
              ))}
            </Swiper>
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
