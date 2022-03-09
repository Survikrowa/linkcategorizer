import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AddLinkToCategoryForm } from '../../components/screens/addLinkToCategory/AddLinkToCategoryForm';

export const NewLinkForCategory = () => (
  <View style={styles.container}>
    <AddLinkToCategoryForm />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f0fffe',
  },
});
