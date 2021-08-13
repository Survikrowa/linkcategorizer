import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterForm } from '../../components/screens/home/authForm/registerForm';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const handleScreenChange = () => navigation.navigate('Login');
  return (
    <SafeAreaView>
      <RegisterForm onPress={handleScreenChange} />
    </SafeAreaView>
  );
};
