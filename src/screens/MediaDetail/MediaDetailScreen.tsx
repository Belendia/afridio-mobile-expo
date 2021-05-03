import React, { useState } from "react";
import {
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Chip, Image, Icon, Button } from "react-native-elements";

import { View, Text } from "../../components/Themed";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TrackScreen from "./TrackScreen";
import InfoScreen from "./InfoScreen";

const Tab = createMaterialTopTabNavigator();

const info = {
  poster_path:
    "https://www.themoviedb.org/t/p/w1280/AoWY1gkcNzabh229Icboa1Ff0BM.jpg",
  original_title: "Vanquish",
  tagline: "She's got one night to same her life.",
  genres: [
    {
      id: 1,
      name: "Novel",
    },
    {
      id: 2,
      name: "Fiction",
    },
  ],
  images: {
    backdrops: [
      {
        file_path:
          "https://www.themoviedb.org/t/p/original/mb3fcmQzXd8aUf7r6izZfMHSJmz.jpg",
      },
      {
        file_path:
          "https://www.themoviedb.org/t/p/original/mYM8x2Atv4MaLulaV0KVJWI1Djv.jpg",
      },
      {
        file_path:
          "https://www.themoviedb.org/t/p/original/zL3UK7vSbPqN7PVyScXObzlvPBD.jpg",
      },
      {
        file_path:
          "https://www.themoviedb.org/t/p/original/fg8NRmYSUp1hXppmsEmclQfDNOF.jpg",
      },
    ],
  },
};
const MediaDetailScreen1 = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const retrieveDetails = (isRefreshed) => {};

  const _onRefresh = () => {
    // setIsRefreshing(true);
    // retrieveDetails("isRefreshed");
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      scrollEventThrottle={100}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={_onRefresh}
          colors={["#EA0000"]}
          tintColor="white"
          title="loading..."
          titleColor="white"
          progressBackgroundColor="white"
        />
      }
    >
      <View>
        <View style={styles.bannerContainer}>
          <View style={styles.buttonPlay}>
            <TouchableWithoutFeedback onPress={() => console.log("Hi")}>
              <Ionicons
                style={styles.iconPlay}
                name="play-circle-outline"
                size={90}
                color="white"
              />
            </TouchableWithoutFeedback>
          </View>
          <Swiper
            autoplay
            autoplayTimeout={4}
            showsPagination={false}
            height={248}
            loop
            index={5}
          >
            {info.images.backdrops.map((item, index) => (
              <View key={index}>
                <Image
                  source={{ uri: `${item.file_path}` }}
                  style={styles.imageBackdrop}
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
            ))}
          </Swiper>
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={{ uri: `${info.poster_path}` }}
            style={styles.cardImage}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{info.original_title}</Text>
            <Text style={styles.cardTagline}>{info.tagline}</Text>
            <View style={styles.cardGenre}>
              {info.genres.map((item) => (
                <View style={{ marginRight: 3 }}>
                  <Chip title={item.name} type="outline" disabled />
                </View>
              ))}
            </View>
            <View style={styles.cardNumbers}>
              <View style={styles.ratingContainer}>
                <Ionicons name="heart" size={20} color="#ed0400" />
                <Text style={styles.ratingText}>1.2K</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View
            style={{
              alignSelf: "center",
              width: Dimensions.get("window").width * 0.9,
            }}
          >
            <Button
              icon={
                <Icon
                  name="cart-plus"
                  type="font-awesome-5"
                  size={24}
                  color="white"
                />
              }
              buttonStyle={{ backgroundColor: "#ed0400" }}
            />
          </View>
          <Tab.Navigator
            initialRouteName="Chapter"
            tabBarOptions={{
              activeTintColor: "white",
              labelStyle: { fontSize: 12 },
              style: { backgroundColor: "#121212" },
              indicatorStyle: {
                backgroundColor: "#ed0500",
              },
            }}
          >
            <Tab.Screen
              name="Info"
              component={InfoScreen}
              options={{ tabBarLabel: "Info" }}
            />
            <Tab.Screen
              name="Chapter"
              component={TrackScreen}
              options={{ tabBarLabel: "Chapters" }}
            />
            <Tab.Screen
              name="Review"
              component={TrackScreen}
              options={{ tabBarLabel: "Reviews" }}
            />
          </Tab.Navigator>
        </View>
      </View>
    </ScrollView>
  );
};

export default MediaDetailScreen1;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#0a0a0a",
  },
  contentContainer: {
    flex: 1,
    marginTop: 157,
  },
  linearGradient: {
    top: 0,
    left: 0,
    right: 0,
    height: 248,
    position: "absolute",
  },
  imageBackdrop: {
    height: 248,
  },
  cardContainer: {
    flex: 1,
    position: "absolute",
    top: 200,
    right: 16,
    left: 16,
    flexDirection: "row",
  },
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    paddingTop: 50,
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    paddingTop: 10,
  },
  cardTagline: {
    color: "white",
    fontSize: 15,
  },
  cardGenre: {
    flexDirection: "row",
    marginTop: 5,
  },
  cardNumbers: {
    flexDirection: "row",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPlay: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent",
  },
  iconPlay: {
    opacity: 0.8,
    backgroundColor: "transparent",
  },
});
