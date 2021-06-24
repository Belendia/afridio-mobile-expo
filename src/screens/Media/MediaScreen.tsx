import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { View, Text } from "../../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TrackScreen from "./TrackScreen";
import InfoScreen from "./InfoScreen";
import { colors } from "../../constants/Colors";
import { RootStoreType } from "../../redux/rootReducer";
import { startToGetMedia } from "../../redux/slices/mediaSlice";
import {
  ProgressBar,
  Backdrop,
  Cover,
  Genre,
  Error,
  NoData,
} from "../../components";

const Tab = createMaterialTopTabNavigator();
const WIDTH = Dimensions.get("window").width - 32;

const MediaScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const { loading, media, error } = useSelector((state: RootStoreType) => ({
    loading: state.mediaReducer.loading,
    media: state.mediaReducer.media,
    error: state.mediaReducer.error,
  }));

  const fetchData = useCallback(() => {
    if (route.params?.slug) {
      dispatch(startToGetMedia(route.params?.slug));
    } else {
      navigation.goBack();
    }
  }, [route.params?.slug, dispatch, startToGetMedia]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error && typeof error === "string") {
    return <Error title={"Error"} message={error} onRetry={fetchData} />;
  }

  return loading ? (
    <ProgressBar />
  ) : media ? (
    <ScrollView
      style={styles.mainContainer}
      scrollEventThrottle={100}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={styles.bannerContainer}>
          <View style={styles.buttonPlay}>
            <TouchableWithoutFeedback onPress={() => console.log("Play")}>
              <Ionicons
                style={styles.iconPlay}
                name="play-circle-outline"
                size={90}
                color="white"
              />
            </TouchableWithoutFeedback>
          </View>
          <Backdrop images={media?.images} />
        </View>
        <View style={styles.cardContainer}>
          <Cover images={media?.images} />

          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{media?.title}</Text>
            <Text
              style={styles.cardTagline}
              numberOfLines={2}
              ellipsizeMode={"tail"}
            >
              {media?.description}
            </Text>
            <Genre genres={media?.genres} style={{ marginTop: 5 }} />
            <View style={styles.cardNumbers}>
              <View style={styles.ratingContainer}>
                <Ionicons name="heart" size={20} color={colors.red800} />
                <Text style={styles.ratingText}>1.2K</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View
            style={{
              alignSelf: "center",
              width: WIDTH,
              marginBottom: 10,
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
              buttonStyle={{ backgroundColor: colors.red800 }}
              onPress={() => console.log("Add to cart")}
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
              name="Info"
              component={InfoScreen}
              options={{ tabBarLabel: "Info" }}
            />
            <Tab.Screen
              name="Chapter"
              component={TrackScreen}
              options={{ tabBarLabel: "Chapters" }}
            />
          </Tab.Navigator>
        </View>
      </View>
    </ScrollView>
  ) : (
    <NoData />
  );
};

export default MediaScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.black800,
  },
  contentContainer: {
    flex: 1,
    marginTop: 157,
  },
  cardContainer: {
    flex: 1,
    position: "absolute",
    top: 200,
    right: 16,
    left: 16,
    flexDirection: "row",
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    paddingTop: 2,
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
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red300,
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
