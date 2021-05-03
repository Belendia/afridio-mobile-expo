import * as React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";

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
          title: "Media",
          headerRight: () => (
            <Icon
              name="cart-outline"
              type="material-community"
              color="white"
              onPress={() => console.log("cart detail")}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
