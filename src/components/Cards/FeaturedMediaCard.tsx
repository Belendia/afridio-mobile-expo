import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

import { View, Text } from "../Themed";

interface FeaturedMediaCardProps {
  movie: {
    id: string;
    title: string;
    description: string;
    cover: string;
    poster: string;
  };
}

const FeaturedMediaCard = ({ movie }: FeaturedMediaCardProps) => {
  const navigation = useNavigation();

  return (
    <View>
      <Image source={{ uri: movie.poster }} style={styles.imageBackdrop} />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(0,0,0, 0.7)", "rgba(0,0,0, 0.8)"]}
        style={styles.linearGradient}
      />
      <View style={styles.cardContainer}>
        <Image source={{ uri: movie.cover }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {movie.title}
          </Text>
          <View style={styles.cardGenre}>
            <Text style={styles.cardGenreItem}>Action</Text>
          </View>
          <View style={styles.cardNumbers}>
            <View style={styles.cardHeart}>
              <Ionicons name="heart" size={20} color="#ed0400" />
              <Text style={styles.cardRatings}>1.2K</Text>
            </View>
          </View>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {movie.description}
          </Text>
          <Button
            title="View Detail"
            buttonStyle={{ backgroundColor: "#ed0400" }}
            titleStyle={{ fontSize: 16 }}
            onPress={() =>
              navigation.navigate("Home", { screen: "MediaScreen" })
            }
          />
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
    backgroundColor: "transparent",
  },
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    backgroundColor: "transparent",
  },
  cardTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    paddingTop: 10,
  },
  cardGenre: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  cardGenreItem: {
    fontSize: 11,
    marginRight: 5,
    color: "white",
    backgroundColor: "transparent",
  },
  cardDescription: {
    color: "#f7f7f7",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
  },
  cardNumbers: {
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: "transparent",
  },
  cardHeart: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  cardRatings: {
    marginLeft: 5,
    fontSize: 12,
    color: "white",
  },
});
