import * as React from "react";
import { StyleSheet, Image, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
import HomeCategory from "../components/HomeCategory";
import categories from "../../assets/data/categories";

const firstCategory = categories.items[0];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories.items}
        renderItem={({ item }) => <HomeCategory category={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
});
