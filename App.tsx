import { StatusBar } from "expo-status-bar";
import React from "react";
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
        <ThemeProvider theme={theme} useDark={colorScheme === "dark"}>
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
