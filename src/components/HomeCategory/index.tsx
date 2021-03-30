import React from "react";
import { StyleSheet, FlatList, Image } from "react-native";

import { Text } from "../Themed";

interface HomeCategoryProps {
  category: {
    id: string;
    title: string;
    movies: {
      id: string;
      poster: string;
    }[];
  };
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props;

  return (
    <>
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
        data={category.movies}
        renderItem={({ item }) => (
          <Image
            style={styles.image}
            source={{
              uri: item.poster,
            }}
          />
        )}
        horizontal
      />
    </>
  );
};

export default HomeCategory;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 170,
    resizeMode: "cover",
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
