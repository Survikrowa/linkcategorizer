import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '../../components/screens/login/LoginForm';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const handleScreenChange = () => navigation.navigate('Register');
  const { getItem } = useAsyncStorage('jwt');

  useEffect(() => {
    getItem().then((accessToken) => {
      if (!accessToken) {
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LoginForm onPress={handleScreenChange} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
