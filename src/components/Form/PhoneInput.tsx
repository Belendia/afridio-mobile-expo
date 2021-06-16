import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, ViewStyle } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import CountryPicker, {
  Country,
  CountryCode,
  DARK_THEME,
} from "react-native-country-picker-modal";
import { Input, Divider } from "react-native-elements";

import { Text, View } from "../Themed";
import { colors } from "../../constants/Colors";

const DARK_THEME_COUNTRY = {
  ...DARK_THEME,
  backgroundColor: colors.black600,
  filterPlaceholderTextColor: colors.red300,
  onBackgroundTextColor: colors.red300,
};

type PhoneInputProps = {
  value?: string | undefined;
  errorMessage?: string | undefined;
  style?: ViewStyle | undefined;
  onChangeText?: ((value: string | undefined) => void) | undefined;
};

const PhoneInput = ({
  value,
  errorMessage,
  style,
  onChangeText,
}: PhoneInputProps) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("ET");
  const [callingCode, setCallingCode] = useState<string>("251");

  const onChange = (phone: string) => {
    onChangeText && onChangeText(callingCode + phone);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <CountryPicker
          countryCode={countryCode}
          withFilter={true}
          withFlag={true}
          withCountryNameButton={false}
          withAlphaFilter={true}
          withCallingCode={true}
          withEmoji={false}
          theme={DARK_THEME_COUNTRY}
          onSelect={(country: Country) => {
            setCountryCode(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />
        <TextInput
          placeholder="912345678"
          onChangeText={(num) => onChange(num)}
          style={styles.input}
          placeholderTextColor={colors.black700}
          keyboardType="phone-pad"
          returnKeyType="next"
          returnKeyLabel="Next"

          // onSubmitEditing={() => password.current?.focus()}
        />
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.red800,
  },
  input: {
    flex: 1,
    color: colors.red300,
    fontSize: 18,
  },
  errorMessage: {
    fontSize: 12,
    color: colors.red800,
    marginTop: 5,
    marginLeft: 5,
  },
});

export { PhoneInput };
