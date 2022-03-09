import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style && style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    elevation: 5,
    borderRadius: 8,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
