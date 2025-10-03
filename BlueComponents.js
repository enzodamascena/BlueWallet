/* eslint react/prop-types: "off", react-native/no-inline-styles: "off" */
import React, { forwardRef } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
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

/**
 * TODO: remove this comment once this file gets properly converted to typescript.
 *
 * @type {React.FC<any>}
 */
export const BlueButtonLink = forwardRef((props, ref) => {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" style={({ pressed }) => [styles.blueButtonLink, pressed && styles.pressed]} {...props} ref={ref}>
      <Text style={{ color: colors.foregroundColor, textAlign: 'center', fontSize: 16 }}>{props.title}</Text>
    </Pressable>
  );
});

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

export const BlueFormLabel = props => {
  const { colors } = useTheme();
  const { direction } = useLocale();

  return (
    <Text
      {...props}
      style={{
        color: colors.foregroundColor,
        fontWeight: '400',
        marginHorizontal: 20,
        writingDirection: direction,
      }}
    />
  );
};

export class is {
  static ipad() {
    return isIpad;
  }
}

const styles = StyleSheet.create({
  blueButtonLink: {
    minWidth: 100,
    minHeight: 36,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
