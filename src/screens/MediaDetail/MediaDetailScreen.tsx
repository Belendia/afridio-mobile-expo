import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Chip, Icon } from "react-native-elements";

import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TrackScreen from "./TrackScreen";
import InfoScreen from "./InfoScreen";

const Tab = createMaterialTopTabNavigator();

// import DefaultTabBar from "../components/ScrollableTabView/DefaultTabBar";
const info = {
  poster_path:
    "https://www.themoviedb.org/t/p/w1280/AoWY1gkcNzabh229Icboa1Ff0BM.jpg",
  original_title: "Vanquish",
  tagline: "Selam",
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
      style={styles.container}
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
        <Swiper
          style={styles.swiper}
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
              <View style={styles.cardStar}>
                <Ionicons name="heart" size={20} color="#59D467" />
                <Text style={styles.cardStarRatings}>1.2K</Text>
              </View>
              <Text style={styles.cardRunningHours} />
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
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
  textStyle: {
    color: "white",
    paddingTop: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
  underlineStyle: {
    backgroundColor: "#EA0000",
  },
  tabBar: {
    backgroundColor: "#131313",
  },
  contentContainer: {
    flex: 1,
    marginTop: 157,
  },
  progressBar: {
    backgroundColor: "#0a0a0a",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#0a0a0a",
  },
  swiper: {
    // position: 'absolute',
    // flex: 1
  },
  linearGradient: {
    top: 0,
    left: 0,
    right: 0,
    height: 248,
    position: "absolute",
  },
  imageBackdrop: {
    // flex: 1,
    height: 248,
    backgroundColor: "black",
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
    fontSize: 19,
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
  cardStar: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardStarRatings: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  cardRunningHours: {
    marginLeft: 5,
    fontSize: 12,
  },
});
