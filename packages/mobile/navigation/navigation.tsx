import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RegisterScreen } from '../screens/register/RegisterScreen';
import { LoginScreen } from '../screens/login/LoginScreen';
import { MyLinks } from '../screens/myLinks/MyLinks';
import { MyLink } from '../screens/myLinks/MyLink';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../types';
import { CreateCategory } from '../screens/CreateCategory/CreateCategory';
import { NewLinkForCategory } from '../screens/NewLinkForCategory/NewLinkForCategory';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MyLinks}
          options={{
            title: 'Twoje kategorie',
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="MyLink"
          component={MyLink}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="NewCategory"
          component={CreateCategory}
          options={{ title: 'Nowa Kategoria' }}
        />
        <Stack.Screen
          name="NewLinkForCategory"
          component={NewLinkForCategory}
          options={{ title: 'Dodaj link do kategorii' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
