import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/homeScreen';
import { AuthFormScreen } from '../screens/AuthFormScreen/authFormScreen';
import Constants from 'expo-constants';
import { AppHeader } from '../components/appHeader';

const Stack = createStackNavigator();

export const Navigation = () => {
  console.log(Constants.statusBarHeight);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          options={{
            headerTitle: (props) => <AppHeader {...props} />,
          }}
          name="Auth"
          component={AuthFormScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
