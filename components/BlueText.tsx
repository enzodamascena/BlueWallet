import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from '@rneui/themed';
import { useTheme } from './themes';
import { useLocale } from '@react-navigation/native';

interface BlueTextProps extends TextProps {
  bold?: boolean;
}

const BlueText = ({ bold = false, ...props }: BlueTextProps) => {
  const { colors } = useTheme();
  const { direction } = useLocale();
  const style = StyleSheet.compose(
    {
      color: colors.foregroundColor,
      writingDirection: direction,
      fontWeight: bold ? 'bold' : 'normal',
    },
    // eslint-disable-next-line react/prop-types
    props.style,
  );
  return <Text {...props} style={style} />;
};

export default BlueText;
