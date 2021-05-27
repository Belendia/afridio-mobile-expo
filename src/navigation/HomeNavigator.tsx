import * as React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import MediaScreen from "../screens/Media/MediaScreen";
import MediaListScreen from "../screens/MediaListScreen";
import { HomeParamList } from "../../types";

const HomeStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  const navigation = useNavigation();

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
      <HomeStack.Screen
        name="MediaListScreen"
        component={MediaListScreen}
        options={{ title: "Media List" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
