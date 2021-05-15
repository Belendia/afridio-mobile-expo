import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { View, Text } from "../Themed";

interface FeaturedMediaCardProps {
  movie: {
    id: string;
    title: string;
    plot: string;
    cover: string;
    poster: string;
  };
}

const FeaturedMediaCard = ({ movie }: FeaturedMediaCardProps) => {
  const navigation = useNavigation();

  return (
    <View>
      <Image
        source={{
          uri: `${movie.cover}`,
        }}
        style={styles.imageBackdrop}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(0,0,0, 0.7)", "rgba(0,0,0, 0.8)"]}
        style={styles.linearGradient}
      />
      <View style={styles.cardContainer}>
        <Image source={{ uri: `${movie.poster}` }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {movie.title}
          </Text>
          <View style={styles.cardGenre}>
            <Text style={styles.cardGenreItem}>Action</Text>
          </View>
          <View style={styles.cardNumbers}>
            <View style={styles.cardStar}>
              <Ionicons name="heart" size={20} color="#ed0400" />
              <Text style={styles.cardStarRatings}>8.9</Text>
            </View>
            <Text style={styles.cardRunningHours} />
          </View>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {movie.plot}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("Home", { screen: "MediaScreen" })
            }
          >
            <View style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { FeaturedMediaCard };

const styles = StyleSheet.create({
  linearGradient: {
    top: 0,
    left: 0,
    right: 0,
    height: 248,
    position: "absolute",
  },
  imageBackdrop: {
    // flex: 1,
    height: 248,
    backgroundColor: "black",
  },
  cardContainer: {
    position: "absolute",
    top: 32,
    right: 16,
    left: 16,
    flexDirection: "row",
  },
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
  },
  cardTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    paddingTop: 10,
  },
  cardGenre: {
    flexDirection: "row",
  },
  cardGenreItem: {
    fontSize: 11,
    marginRight: 5,
    color: "white",
  },
  cardDescription: {
    color: "#f7f7f7",
    fontSize: 13,
    marginTop: 5,
  },
  cardNumbers: {
    flexDirection: "row",
    marginTop: 5,
  },
  cardStar: {
    flexDirection: "row",
  },
  cardStarRatings: {
    marginLeft: 5,
    fontSize: 12,
    color: "white",
  },
  cardRunningHours: {
    marginLeft: 5,
    fontSize: 12,
  },
  viewButton: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#EA0000",
    width: 100,
    height: 30,
    marginTop: 10,
  },
  viewButtonText: {
    color: "white",
  },
});
