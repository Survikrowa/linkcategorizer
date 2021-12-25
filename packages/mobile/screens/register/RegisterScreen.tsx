import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterForm } from '../../components/screens/register/RegisterForm';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const handleScreenChange = () => navigation.navigate('Login');
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RegisterForm onPress={handleScreenChange} />
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
