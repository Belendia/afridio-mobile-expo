import React from "react";
import { StyleSheet, Platform, FlatList, RefreshControl } from "react-native";
import { View, Text } from "../components/Themed";

import categories from "../../assets/data/categories";
import { ProgressBar, MediaListCard } from "../components";

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
      //   renderSeparator={(sectionId, rowId) => (
      //     <View key={rowId} style={styles.seperator} />
      //   )}
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
          colors={["#EA0000"]}
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
    backgroundColor: "#0a0a0a",
    ...Platform.select({
      ios: {
        paddingTop: 83,
      },
    }),
  },
  progressBar: {
    backgroundColor: "#0a0a0a",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seperator: {
    marginTop: 10,
    backgroundColor: "#8E8E8E",
  },
});
