import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface BlueCardProps extends ViewProps {
  children: React.ReactNode;
}

const BlueCard = (props: BlueCardProps) => {
  return (
    <View style={styles.card} {...props}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
});

export default BlueCard;
