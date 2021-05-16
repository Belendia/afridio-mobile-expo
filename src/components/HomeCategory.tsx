import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { View, Text } from "./Themed";
import { SimpleMediaCard } from "./Cards/SimpleMediaCard";

interface HomeCategoryProps {
  category: {
    id: string;
    title: string;
    movies: {
      id: string;
      title: string;
      plot: string;
      poster: string;
    }[];
  };
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.listHeading}>
        <Text style={styles.listHeadingLeft}>{category.title}</Text>
        <TouchableOpacity>
          <Text
            style={styles.listHeadingRight}
            onPress={() =>
              navigation.navigate("Home", { screen: "MediaListScreen" })
            }
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={category.movies}
        renderItem={({ item }) => <SimpleMediaCard movie={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeCategory;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 170,
    resizeMode: "cover",
    borderRadius: 5,
    margin: 5,
  },
  listHeading: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  listHeadingLeft: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  listHeadingRight: {
    color: "white",
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
});
