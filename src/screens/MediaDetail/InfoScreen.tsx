import React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../../components/Themed";
import movie from "../../../assets/data/movie";

const info = movie.seasons.items[0].episodes.items[0];

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
        <Text style={styles.label}>Author</Text>
        <Text style={styles.value}>Haimanot Lemma</Text>
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Narrated By</Text>
        <Text style={styles.value}>Tigist Getachew</Text>
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
});
