import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "../../components/Themed";

import movie from "../../../assets/data/movie";
import TrackItem from "../../components/TrackItem";

const TrackScreen = () => {
  return movie.seasons.items[0].episodes.items.map((item, index) => (
    <View style={styles.container} key={index}>
      <TrackItem episode={item} index={(index + 1).toString()} />
    </View>
  ));
};

export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
  },
});
