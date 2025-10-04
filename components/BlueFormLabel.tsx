import React from 'react';
import { Text, TextProps } from '@rneui/themed';
import { useTheme } from './themes';
import { useLocale } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const BlueFormLabel = (props: TextProps) => {
  const { colors } = useTheme();
  const { direction } = useLocale();

  const textStyle = {
    ...styles.label,
    color: colors.foregroundColor,
    writingDirection: direction,
  };

  return <Text {...props} style={textStyle} />;
};

const styles = StyleSheet.create({
  label: {
    fontWeight: '400',
    marginHorizontal: 20,
  },
});
