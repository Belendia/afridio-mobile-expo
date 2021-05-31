import React, { ReactNode } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";

import { View, Text } from "../../components/Themed";

type AuthContainerProps = {
  showLogo: boolean;
  title: string;
  titleAlignCenter: boolean;
  children: ReactNode;
};

const AuthContainer = ({
  showLogo,
  title,
  titleAlignCenter,
  children,
}: AuthContainerProps) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled={Platform.OS === "ios"} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="always" bounces={false}>
          <View style={styles.card}>
            {showLogo && (
              <>
                <Image
                  source={require("../../../assets/images/icon.png")}
                  style={styles.logo}
                />

                <Divider
                  style={{ backgroundColor: "#363333", marginBottom: 20 }}
                />
              </>
            )}

            <Text
              style={[
                styles.title,
                titleAlignCenter && styles.titleAlignCenter,
              ]}
            >
              {title}
            </Text>
            <View style={styles.formWrapper}>{children}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

AuthContainer.defaultProps = {
  titleAlignCenter: false,
};

export { AuthContainer };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#211f1f",
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    height: 80,
    width: 150,
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    marginHorizontal: 16,
  },
  formWrapper: {
    marginVertical: 0,
    marginHorizontal: 12,
    backgroundColor: "#211f1f",
  },
  titleAlignCenter: {
    alignSelf: "center",
  },
});
