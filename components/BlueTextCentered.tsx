import React from "react";
import { StyleSheet } from "react-native";
import { Text, TextProps } from "@rneui/themed";
import { useTheme } from "./themes";

const BlueTextCentered = (props: TextProps) => {
  const { colors } = useTheme();
  return <Text {...props} style={[styles.text, { color: colors.foregroundColor }]} />;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

export default BlueTextCentered;