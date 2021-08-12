import React from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View>
      <Text>Welcome on Home Page i guess</Text>
      <Button title="Zaloguj się" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
};
