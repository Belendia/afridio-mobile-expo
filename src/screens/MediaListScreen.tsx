import React from "react";
import { StyleSheet, Platform, FlatList, RefreshControl } from "react-native";
import { View } from "../components/Themed";

import categories from "../../assets/data/categories";
import { ProgressBar, MediaListCard } from "../components";
import { colors } from "../constants/Colors";

const MediaListScreen = () => {
  const isLoading = false;
  const isRefreshing = false;
  return isLoading ? (
    <View style={styles.progressBar}>
      <ProgressBar />
    </View>
  ) : (
    <FlatList
      style={styles.container}
      onEndReached={() => true}
      onEndReachedThreshold={1200}
      //   dataSource={this.state.dataSource}
      renderItem={({ item }) => <MediaListCard movie={item} />}
      data={categories.items[0].movies}
      ListFooterComponent={() => (
        <View style={{ height: 50 }}>
          <ProgressBar />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          // onRefresh={this._onRefresh}
          colors={[colors.red900]}
          tintColor="white"
          title="loading..."
          titleColor="white"
          progressBackgroundColor="white"
        />
      }
    />
  );
};

export default MediaListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black800,
    ...Platform.select({
      ios: {
        paddingTop: 83,
      },
    }),
  },
  progressBar: {
    backgroundColor: colors.black800,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
