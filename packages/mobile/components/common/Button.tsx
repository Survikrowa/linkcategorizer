import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  onPress: () => void;
  children: React.ReactNode;
};

export const Button = ({ variant = 'primary', onPress, children }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, variant === 'primary' && styles.buttonPrimary]}
  >
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 16,
    fontSize: 14,
  },
  buttonPrimary: {
    backgroundColor: '#34a6e3',
    borderRadius: 16,
  },
});
