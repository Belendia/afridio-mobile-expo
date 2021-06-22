import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import { View, Text } from "../Themed";
import { colors } from "../../constants/Colors";
import { Media } from "../../../types";

// interface SimpleMediaCardProps {
//   movie: {
//     id: string;
//     title: string;
//     cover: string;
//   };
// }

const SimpleMediaCard = memo(({ images, title }: Media) => {
  const navigation = useNavigation();
  let cover = null;
  if (images?.length > 0) {
    cover = images.find((img) => img.width === 300);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Home", { screen: "MediaScreen" })}
    >
      <View style={styles.cardContainer}>
        {cover ? (
          <Image
            source={{ uri: cover?.image }}
            style={styles.cardImage}
            PlaceholderContent={<ActivityIndicator color={colors.red300} />}
          />
        ) : (
          <Image
            source={require("../../../assets/images/no-cover.png")}
            style={styles.cardImage}
          />
        )}

        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export { SimpleMediaCard };

const styles = StyleSheet.create({
  cardContainer: {
    height: 231,
    width: 135,
    backgroundColor: colors.black600,
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
    backgroundColor: colors.black600,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardTitle: {
    color: colors.red300,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 3,
  },
});
