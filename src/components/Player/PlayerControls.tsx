import React from "react";
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Text, View } from "../Themed";

const { width } = Dimensions.get("window");
export const PLACEHOLDER_WIDTH = width / 3;

type PlayerControlsProps = {
  title: string;
  onPress: () => void;
};

export default class PlayerControls extends React.PureComponent<PlayerControlsProps> {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.placeholder} />
          <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>
          <Feather style={styles.icon} name="play" />

          <TouchableWithoutFeedback onPress={() => setVideo(null)}>
            <Feather style={styles.icon} name="x" />
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: 8,
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH,
  },
  icon: {
    fontSize: 24,
    color: "gray",
    padding: 8,
  },
});
