/* eslint react/prop-types: "off", react-native/no-inline-styles: "off" */
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { useTheme } from './components/themes';
import { useLocale } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;
let isIpad;
if (aspectRatio > 1.6) {
  isIpad = false;
} else {
  isIpad = true;
}

export const BlueCard = props => {
  return <View {...props} style={{ padding: 20 }} />;
};

export const BlueText = ({ bold = false, ...props }) => {
  const { colors } = useTheme();
  const { direction } = useLocale();
  const style = StyleSheet.compose(
    {
      color: colors.foregroundColor,
      writingDirection: direction,
      fontWeight: bold ? 'bold' : 'normal',
    },
    props.style,
  );
  return <Text {...props} style={style} />;
};

export const BlueTextCentered = props => {
  const { colors } = useTheme();
  return <Text {...props} style={{ color: colors.foregroundColor, textAlign: 'center' }} />;
};
export class is {
  static ipad() {
    return isIpad;
  }
}
