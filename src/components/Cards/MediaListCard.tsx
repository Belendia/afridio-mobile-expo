import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { View, Text } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/Colors";
import { Chip } from "../Media/Chip";
import { Media } from "../../../types";
import { Cover } from "../Media/Cover";

type MediaListCardProps = {
  media: Media;
};

const MediaListCard = memo(
  ({ media }: MediaListCardProps) => {
    const navigation = useNavigation();

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Home", { screen: "MediaScreen" })}
        >
          <View style={styles.card}>
            <Cover images={media?.images} />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle} numberOfLines={3}>
                {media.title}
              </Text>
              <Chip values={media.genres} />
              <View style={styles.cardNumbers}>
                <View style={styles.cardHeart}>
                  <Ionicons name="heart" size={20} color={colors.red800} />
                  <Text style={styles.cardRatings}>1.2k</Text>
                </View>
              </View>
              <Text
                style={styles.cardDescription}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {media.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.media.slug !== nextProps.media.slug) {
      return false;
    }
    return true;
  }
);

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
  cardTitle: {
    color: colors.black300,
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
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
