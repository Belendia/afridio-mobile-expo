import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { useSelector } from "react-redux";

import { View, Text } from "../../components/Themed";
import movie from "../../../assets/data/movie";
import { colors } from "../../constants/Colors";
import { RootStoreType } from "../../redux/rootReducer";
import { Author } from "../../components";

const InfoScreen = () => {
  const { media } = useSelector((state: RootStoreType) => ({
    media: state.mediaReducer.media,
  }));
  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <Text style={styles.label}>Overview</Text>
        <Text style={styles.overviewText}>{media?.description}</Text>
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Release Date</Text>
        <Text style={styles.value}>{media?.release_date}</Text>
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Narrated By</Text>
        <Text style={styles.value}>Tigist Getachew</Text>
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>Authors</Text>
      </View>
      <View style={styles.authorsContainer}>
        {media?.authors.map((item, index) => (
          <Author {...item} key={index} />
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
    color: colors.red300,
    fontSize: 14,
    paddingTop: 10,
    lineHeight: 22,
  },
  label: {
    color: colors.red300,
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    color: colors.red300,
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
});
