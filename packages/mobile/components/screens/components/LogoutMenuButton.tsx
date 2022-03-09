import React from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useToasts } from '../../../hooks/useToasts';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type LogoutMenuButtonNavigation = StackNavigationProp<RootStackParamList>;

export const LogoutMenuButton = () => {
  const { dispatch } = useToasts();

  const { removeItem } = useAsyncStorage('jwt');

  const navigation = useNavigation<LogoutMenuButtonNavigation>();

  const handleLogout = async () => {
    try {
      await removeItem();
      dispatch({
        type: 'ShowToast',
        payload: {
          message: 'Wylogowanie powiodło się.',
          duration: 'LONG',
        },
      });
      navigation.navigate('Login');
    } catch (e) {
      dispatch({
        type: 'ShowToast',
        payload: {
          message: 'Wylogowanie nie powiodło się. Spróbuj ponownie później.',
          duration: 'LONG',
        },
      });
    }
  };
  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={styles.button}>Wyloguj się</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 8,
    fontWeight: 'bold',
  },
});
