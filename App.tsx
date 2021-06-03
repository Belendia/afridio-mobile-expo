import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { Provider } from "react-redux";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { theme } from "./src/components/Themed";
import { store } from "./src/redux/store";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme} useDark={colorScheme === "dark"}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
