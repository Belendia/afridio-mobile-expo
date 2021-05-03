import React from "react";
import { StyleSheet, Image } from "react-native";

import { View, Text } from "../../components/Themed";
import movie from "../../../assets/data/movie";

const info = movie.seasons.items[0].episodes.items[0];
const authors = [
  {
    id: 1,
    name: "Addis Alemayehu",
    profile_photo:
      "https://www.themoviedb.org/t/p/w185/oIciQWr8VwKoR8TmAw1owaiZFyb.jpg",
  },
  {
    id: 2,
    name: "Tola Dinku",
    profile_photo:
      "https://www.themoviedb.org/t/p/w185/djhT0A2hZxpYKPnCeRtim8qUdPi.jpg",
  },
];
const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <Text style={styles.label}>Overview</Text>
        <Text style={styles.overviewText}>{info.plot}</Text>
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Release Date</Text>
        <Text style={styles.value}>{info.duration}</Text>
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Narrated By</Text>
        <Text style={styles.value}>Tigist Getachew</Text>
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>Authors</Text>
      </View>
      <View style={styles.authorsContainer}>
        {authors.map((item) => (
          <View key={item.id} style={styles.castContainer}>
            <Image
              source={{ uri: `${item.profile_photo}` }}
              style={styles.castImage}
            />
            <View style={styles.characterContainer}>
              <Text style={styles.characterName}>{item.name}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  overview: {
    marginBottom: 15,
  },
  overviewText: {
    color: "#d2d2d2",
    fontSize: 14,
    paddingTop: 10,
    lineHeight: 22,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    color: "#d2d2d2",
    fontSize: 14,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  authorsContainer: {
    marginTop: 20,
  },
  castContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  characterContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 16,
  },
  characterName: {
    color: "white",
    flexDirection: "column",
    fontSize: 16,
    fontWeight: "500",
  },
});
