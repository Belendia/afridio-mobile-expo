import { Ionicons } from "@expo/vector-icons";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";

import { BottomTabParamList } from "../../types";
import SettingsNavigator from "./SettingsNavigator";
import { MediaPlayer } from "../components";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={(props) => (
        <>
          <MediaPlayer />
          <BottomTabBar {...props} />
        </>
      )}
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="home" color={color} size={24} />
            ) : (
              <Ionicons name="home-outline" color={color} size={24} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="search" color={color} size={24} />
            ) : (
              <Ionicons name="search-outline" color={color} size={24} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="library" color={color} size={24} />
            ) : (
              <Ionicons name="library-outline" color={color} size={24} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="settings" color={color} size={24} />
            ) : (
              <Ionicons name="settings-outline" color={color} size={24} />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
