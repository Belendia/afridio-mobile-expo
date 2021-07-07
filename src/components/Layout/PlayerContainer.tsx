import React, { ReactNode, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../constants/Colors";

type PlayerContainerProps = {
  children: ReactNode;
};

const PlayerContainer = ({ children }: PlayerContainerProps) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  return (
    <>
      <Header
        leftComponent={
          <Ionicons
            onPress={goBack}
            name="chevron-down"
            size={24}
            color="white"
          />
        }
        containerStyle={styles.header}
      />
      {children}
    </>
  );
};

export { PlayerContainer };

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black800,
    justifyContent: "space-around",
    borderBottomWidth: 0,
  },
});
