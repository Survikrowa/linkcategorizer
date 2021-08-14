import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { getItem } = useAsyncStorage('jwt');
  useEffect(() => {
    getItem().then((accessToken) => {
      if (!accessToken) {
        navigation.navigate('Register');
      }
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>Here will be Form for auth</Text>
    </SafeAreaView>
  );
};
