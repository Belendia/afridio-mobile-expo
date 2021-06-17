import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "react-native-elements";

import { View, Text } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/Colors";

interface MediaListCardProps {
  movie: {
    id: string;
    title: string;
    description: string;
    cover: string;
    poster: string;
    genres: {
      id: number;
      name: string;
    }[];
  };
}

const MediaListCard = memo(({ movie }: MediaListCardProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Home", { screen: "MediaScreen" })}
      >
        <View style={styles.card}>
          <Image source={{ uri: movie.cover }} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle} numberOfLines={3}>
              {movie.title}
            </Text>
            <View style={styles.cardGenre}>
              {movie.genres.map((item, index) => (
                <View
                  style={{ marginRight: 3, backgroundColor: "transparent" }}
                  key={index}
                >
                  <Chip
                    title={item.name}
                    type="outline"
                    titleStyle={{ fontSize: 12 }}
                    buttonStyle={{ padding: 5 }}
                    disabled
                  />
                </View>
              ))}
            </View>
            <View style={styles.cardNumbers}>
              <View style={styles.cardHeart}>
                <Ionicons name="heart" size={20} color={colors.red800} />
                <Text style={styles.cardRatings}>1.2k</Text>
              </View>
            </View>
            <Text style={styles.cardDescription} numberOfLines={3}>
              {movie.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export { MediaListCard };

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 5,
  },
  card: {
    backgroundColor: colors.black600,
    borderRadius: 3,
    minHeight: 148,
    flexDirection: "row",
    paddingRight: 16,
    overflow: "hidden",
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    backgroundColor: "transparent",
  },
  cardImage: {
    height: 163,
    width: 120,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  cardTitle: {
    color: colors.black300,
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
  },
  cardGenre: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  cardGenreItem: {
    fontSize: 11,
    marginRight: 5,
  },
  cardDescription: {
    color: colors.black300,
    fontSize: 13,
    marginTop: 5,
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
    color: colors.black300,
  },
});
