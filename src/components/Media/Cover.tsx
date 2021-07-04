import React, { memo } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Image } from "react-native-elements";

import { Image as ImageType } from "../../../types";
import { colors } from "../../constants/Colors";
import { Size } from "../../constants/Options";

type CoverProps = {
  images: ImageType[] | undefined;
  size?: Size | undefined;
};

const Cover = memo<CoverProps>(
  ({ images, size }: CoverProps) => {
    let cover = null;
    if (images && images?.length > 0) {
      cover = images.find((img) => img.width === 300);
    }
    return cover ? (
      <Image
        source={{ uri: cover?.image }}
        style={[
          styles.cardImage,
          size === Size.Small && { width: 100, height: 136 },
        ]}
        PlaceholderContent={<ActivityIndicator color={colors.red300} />}
      />
    ) : (
      <Image
        source={require("../../../assets/images/no-cover.png")}
        style={[
          styles.cardImage,
          size === Size.Small && { width: 100, height: 136 },
        ]}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.images?.length !== nextProps.images?.length) {
      return false;
    }
    return true;
  }
);

export { Cover };

const styles = StyleSheet.create({
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
});
