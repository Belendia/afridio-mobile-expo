import React, { memo } from "react";
import { StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "@r0b0t3d/react-native-carousel";

import { View } from "../Themed";
import { colors } from "../../constants/Colors";
import { Image as ImageType } from "../../../types";

type BackdropProps = {
  images: ImageType[] | undefined;
};

const Backdrop = memo(
  ({ images }: BackdropProps) => {
    //   const currentPage = useSharedValue(0);
    let poster = null;
    if (images && images?.length > 0) {
      poster = images?.filter((img) => img.width === 500);
    }

    let backdrop = (
      <Image
        source={require("../../../assets/images/backdrop.png")}
        style={styles.imageBackdrop}
      />
    );

    if (poster && poster.length === 1) {
      backdrop = (
        <Image
          source={{ uri: `${poster[0].image}` }}
          style={styles.imageBackdrop}
        />
      );
    } else if (poster && poster.length > 1) {
      backdrop = (
        <Carousel
          style={{ height: 248 }}
          data={poster}
          loop={true}
          autoPlay={true}
          duration={3000}
          inactiveOpacity={0.5}
          firstItemAlignment="start"
          keyExtractor={(item) => item.slug}
          renderItem={({ item, index }) => {
            return (
              <View key={index}>
                <Image
                  source={{ uri: `${item.image}` }}
                  style={styles.carouselImageBackdrop}
                />
                <LinearGradient
                  colors={[
                    "rgba(0, 0, 0, 0.2)",
                    "rgba(0,0,0, 0.2)",
                    "rgba(0,0,0, 0.7)",
                  ]}
                  style={styles.linearGradient}
                />
              </View>
            );
          }}
        />
      );
    }
    return backdrop;
  },
  (prevProps, nextProps) => {
    if (prevProps.images?.length !== nextProps.images?.length) {
      return false;
    }
    return true;
  }
);

export { Backdrop };

const styles = StyleSheet.create({
  imageBackdrop: {
    height: 248,
    width: "100%",
    backgroundColor: colors.black800,
    opacity: 0.6,
  },
  carouselImageBackdrop: {
    height: 248,
    width: "100%",
  },
  linearGradient: {
    top: 0,
    left: 0,
    right: 0,
    height: 248,
    position: "absolute",
  },
});
