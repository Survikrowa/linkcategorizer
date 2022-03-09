import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CreateCategoryForm } from '../../components/screens/createcategory/CreateCategoryForm';

export const CreateCategory = () => (
  <View style={styles.container}>
    <CreateCategoryForm />
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
