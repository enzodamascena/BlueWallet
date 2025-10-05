/* eslint react/prop-types: "off", react-native/no-inline-styles: "off" */
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
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

export class is {
  static ipad() {
    return isIpad;
  }
}
