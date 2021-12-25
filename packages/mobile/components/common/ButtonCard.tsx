import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const ButtonCard = ({ children, onPress }: CardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
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
  },
});
