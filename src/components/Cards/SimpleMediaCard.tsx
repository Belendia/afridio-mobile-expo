import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { View, Text } from "../Themed";
import { colors } from "../../constants/Colors";
import { Media } from "../../../types";
import {
  setMediaLoadingTrue,
  setMediaSlug,
} from "../../redux/slices/mediaSlice";
import { Cover } from "../Media/Cover";

const SimpleMediaCard = memo(({ slug, images, title }: Media) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        /**
         * When you open a media a second or more time, reload is false but there is a
         * media data in the redux from the previous call. So the app will try to render
         * that before it gets the latest data.
         **/
        dispatch(setMediaLoadingTrue());
        dispatch(setMediaSlug(slug));
      }}
    >
      <View style={styles.cardContainer}>
        <Cover images={images} />

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
