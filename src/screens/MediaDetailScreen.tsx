import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

import { View, Text } from "../components/Themed";
import movie from "../../assets/data/movie";

const firstEpisode = movie.seasons.items[0].episodes.items[0];

const MediaDetailScreen = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: firstEpisode.poster,
        }}
      />
      <View style={{ padding: 12 }}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.info}>
          <View style={styles.likesContainer}>
            <Ionicons name="heart-outline" size={24} color="#59D467" />
            <Text style={styles.likes}>50K</Text>
          </View>
          <Text style={styles.year}>1980</Text>
          <View style={styles.ageContainer}>
            <Text style={styles.age}>12+</Text>
          </View>
        </View>
      </View>

      {/* Play button*/}
      <Pressable
        onPress={() => {
          console.warn("Playing");
        }}
        style={styles.playButton}
      >
        <Text style={styles.playButtonText}>
          <Entypo name="controller-play" size={16} color="black" /> Play
        </Text>
      </Pressable>

      {/* Play button*/}
      <Pressable
        onPress={() => {
          console.warn("Download");
        }}
        style={styles.downloadButton}
      >
        <Text style={styles.downloadButtonText}>
          <AntDesign name="download" size={16} color="white" /> Download
        </Text>
      </Pressable>

      <Text style={{ marginTop: 10 }}>{movie.plot}</Text>
      <Text style={styles.year}>Author: {movie.cast}</Text>
      <Text style={styles.year}>Narrator: {movie.creator}</Text>
      <Text style={styles.year}>Genra: {movie.cast}</Text>

      {/* Icon buttons */}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View style={styles.bigButton}>
          <Ionicons name="heart-outline" size={30} color="white" />
          <Text style={{ color: "darkgray" }}>Like</Text>
        </View>
        <View style={styles.bigButton}>
          <Ionicons name="share-social" size={30} color="white" />
          <Text style={{ color: "darkgray" }}>Share</Text>
        </View>
      </View>
    </View>
  );
};

export default MediaDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  likesContainer: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: "center",
  },
  likes: {
    fontWeight: "bold",
    color: "#59D467",
  },
  year: {
    color: "#757575",
    marginRight: 10,
  },
  ageContainer: {
    backgroundColor: "#E6E229",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    paddingHorizontal: 4,
  },
  age: {
    color: "black",
    fontWeight: "bold",
  },
  playButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  playButtonText: {
    color: "black",
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: "#2b2b2b",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 3,
    marginVertical: 5,
  },
  downloadButtonText: {
    color: "white",
    fontSize: 16,
  },
  bigButton: {
    alignItems: "center",
    marginHorizontal: 20,
  },
});
