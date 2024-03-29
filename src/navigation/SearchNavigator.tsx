import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import SearchScreen from "../screens/SearchScreen";
import { SearchParamList } from "../../types";

const SearchStack = createStackNavigator<SearchParamList>();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: "Search" }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;
