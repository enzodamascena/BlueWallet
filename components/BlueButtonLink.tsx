import React, { forwardRef } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { Text } from '@rneui/themed';
import { useTheme } from "./themes";

type Props = PressableProps & {
  title: string;
}

const BlueButtonLink = forwardRef<React.ElementRef<typeof Pressable>, Props>((props, ref) => {
  const { colors } = useTheme();

  const textStyle = {
    ...styles.text,
    color: colors.foregroundColor,
  };

  return (
    <Pressable 
        accessibilityRole="button"
        style={({ pressed }) => [styles.blueButtonLink, pressed && styles.pressed]} 
        {...props} 
        ref={ref}
     >
      <Text style={textStyle}>{props.title}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  blueButtonLink: {
    minWidth: 100,
    minHeight: 36,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});


export default BlueButtonLink;
