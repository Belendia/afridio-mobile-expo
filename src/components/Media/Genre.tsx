import React from "react";
import { StyleSheet } from "react-native";
import { Chip } from "react-native-elements";

import { View } from "../Themed";

type GenreProps = {
  genres: string[];
};

const Genre = ({ genres }: GenreProps) => {
  return (
    <View style={styles.cardGenre}>
      {genres.map((item, index) => (
        <View
          style={{ marginRight: 3, backgroundColor: "transparent" }}
          key={index}
        >
          <Chip
            title={item}
            type="outline"
            titleStyle={{ fontSize: 12 }}
            buttonStyle={{ padding: 5 }}
            disabled
          />
        </View>
      ))}
    </View>
  );
};

export { Genre };

const styles = StyleSheet.create({
  cardGenre: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  cardGenreItem: {
    fontSize: 11,
    marginRight: 5,
  },
});
