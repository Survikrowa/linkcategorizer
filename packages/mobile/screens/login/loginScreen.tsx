import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '../../components/screens/home/authForm/loginForm';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const handleScreenChange = () => navigation.navigate('Register');
  return (
    <SafeAreaView>
      <LoginForm onPress={handleScreenChange} />
    </SafeAreaView>
  );
};
