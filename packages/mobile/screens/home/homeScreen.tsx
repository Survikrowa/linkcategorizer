import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEffect(() => {
    if (true) {
      navigation.navigate('Register');
    }
  }, []);
  return (
    <SafeAreaView>
      <Text>Here will be Form for auth</Text>
    </SafeAreaView>
  );
};
