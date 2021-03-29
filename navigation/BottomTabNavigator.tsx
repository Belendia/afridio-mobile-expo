import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import HomeStackNavigator from "./HomeStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";

import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
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
        component={SearchStackNavigator}
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
        component={SearchStackNavigator}
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
        component={SearchStackNavigator}
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
}
