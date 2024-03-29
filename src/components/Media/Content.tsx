import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { Chip } from "./Chip";
import { Cover } from "./Cover";
import { MediaButton } from "./MediaButton";
import { colors } from "../../constants/Colors";
import { View, Text } from "../Themed";
import Info from "./Info";
import Tracks from "./Tracks";
import { Media } from "../../../types";
import { Size } from "../../constants/Options";

const Tab = createMaterialTopTabNavigator();

type ContentProps = {
  media: Media | undefined;
  isPlaying: boolean | undefined;
  onPlayPress: () => void;
};

const Content = ({ media, isPlaying, onPlayPress }: ContentProps) => {
  return (
    <ScrollView
      style={styles.mainContainer}
      scrollEventThrottle={100}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cardContainer}>
        <Cover images={media?.images} size={Size.Medium} />

        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{media?.title}</Text>
          <Text
            style={styles.cardTagline}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            {media?.description}
          </Text>
          <Chip values={media?.genres} style={{ marginTop: 5 }} />
          <View style={styles.cardNumbers}>
            <View style={styles.ratingContainer}>
              <Ionicons name="heart" size={20} color={colors.red800} />
              <Text style={styles.ratingText}>1.2K</Text>
            </View>
          </View>
        </View>
        <View style={styles.playContainer}>
          {/* <View style={styles.outerCircle}></View> */}
          <TouchableOpacity onPress={onPlayPress} style={styles.outerCircle}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={40}
              color={colors.red200}
              style={styles.playIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mediaButtons}>
          <MediaButton name="heart" label="like" onPress={() => true} />
          <MediaButton name="share" label="share" onPress={() => true} />
          <MediaButton
            name="arrow-down-circle"
            label="Download"
            onPress={() => true}
          />
        </View>

        <Tab.Navigator
          initialRouteName="Chapter"
          tabBarOptions={{
            activeTintColor: "white",
            labelStyle: { fontSize: 12 },
            style: { backgroundColor: colors.black600 },
            indicatorStyle: {
              backgroundColor: colors.red800,
            },
          }}
        >
          <Tab.Screen
            name="Chapter"
            component={Tracks}
            options={{ tabBarLabel: "Chapters" }}
          />
          <Tab.Screen
            name="Info"
            component={Info}
            options={{ tabBarLabel: "Info" }}
          />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};

export { Content };

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.black800,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: colors.black600,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 5,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    paddingTop: 2,
    backgroundColor: "transparent",
  },
  cardTitle: {
    color: colors.red300,
    fontSize: 20,
    fontWeight: "500",
    paddingTop: 10,
  },
  cardTagline: {
    color: colors.red300,
    fontSize: 15,
  },
  cardNumbers: {
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: "transparent",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red300,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  mediaButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  playContainer: {
    flexDirection: "column-reverse",
    backgroundColor: "transparent",
    paddingRight: 10,
    paddingBottom: 4,
  },
  outerCircle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: colors.red800,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    marginLeft: 3,
  },
});
