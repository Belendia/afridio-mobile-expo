import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { FeaturedMediaCard } from "../components/Cards/FeaturedMediaCard";

import { View } from "../components/Themed";
import HomeCategory from "../components/HomeCategory";
import categories from "../../assets/data/categories";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories.items}
        renderItem={({ item }) => <HomeCategory category={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Swiper
            autoplay
            autoplayTimeout={4}
            showsPagination={false}
            height={248}
          >
            {categories.items[0].movies.map((movie) => (
              <FeaturedMediaCard key={movie.id} movie={movie} />
            ))}
          </Swiper>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});
