import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import MediaDetailScreen from "../screens/MediaDetail/MediaDetailScreen";
import { HomeParamList } from "../../types";

const HomeStack = createStackNavigator<HomeParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={MediaDetailScreen} //HomeScreen
        options={{ title: "Media detail" }}
      />
      <HomeStack.Screen
        name="MediaDetailScreen"
        component={MediaDetailScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
