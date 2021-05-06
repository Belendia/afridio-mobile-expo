import * as React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MediaScreen from "../screens/Media/MediaScreen";
import { HomeParamList } from "../../types";

const HomeStack = createStackNavigator<HomeParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen} //HomeScreen
        options={{ title: "Home" }}
      />
      <HomeStack.Screen
        name="MediaScreen"
        component={MediaScreen}
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
