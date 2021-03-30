import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import SearchScreen from "../screens/SearchScreen";
import { SearchParamList } from "../../types";

const SearchStack = createStackNavigator<SearchParamList>();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;
