import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { RegisterForm } from '../../components/screens/authForm/registerForm';

type AuthFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

type AuthFormScreenProps = {
  navigation: AuthFormScreenNavigationProp;
};

export const AuthFormScreen = ({ navigation }: AuthFormScreenProps) => {
  const [currentFormType, setCurrentFormType] = useState<'login' | 'register'>('register');

  return (
    <View>
      <Text>Here will be Form for auth</Text>
      <Button title="Wróć do strony głównej" onPress={() => navigation.navigate('Home')} />
      {currentFormType === 'login' ? null : <RegisterForm handleFormChange={setCurrentFormType} />}
    </View>
  );
};
