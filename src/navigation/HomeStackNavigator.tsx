import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Button } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import MediaDetailScreen from "../screens/MediaDetail/MediaDetailScreen";
import { HomeParamList } from "../../types";

const HomeStack = createStackNavigator<HomeParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen} //HomeScreen
        options={{ title: "" }}
      />
      <HomeStack.Screen
        name="MediaDetailScreen"
        component={MediaDetailScreen}
        options={{
          title: "Media detail",
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
