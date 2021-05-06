import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { View, Text } from "../Themed";

interface SimpleMediaCardProps {
  movie: {
    id: string;
    title: string;
    poster: string;
  };
}

const SimpleMediaCard = ({ movie }: SimpleMediaCardProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Home", { screen: "MediaScreen" })}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={styles.cardImage}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { SimpleMediaCard };

const styles = StyleSheet.create({
  cardContainer: {
    height: 231,
    width: 135,
    backgroundColor: "white",
    flexDirection: "column",
    marginRight: 10,
    borderRadius: 5,
  },
  cardImage: {
    width: 135,
    height: 184,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardTitleContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardTitle: {
    color: "black",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 1,
  },
});
