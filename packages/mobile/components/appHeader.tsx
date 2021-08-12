import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackHeaderTitleProps } from '@react-navigation/stack';
import Constants from 'expo-constants';

export const AppHeader = ({}: StackHeaderTitleProps) => {
  return (
    <View style={styles.container}>
      <Text>Witaj w Recape!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
});
