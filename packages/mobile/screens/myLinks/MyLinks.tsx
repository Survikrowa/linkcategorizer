import React, { useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from '../../components/screens/home/HomeScreen';
import { ShowMenuButton } from '../../components/screens/components/ShowMenuButton';
import { StatusBar, StyleSheet, View } from 'react-native';
import { getDimensionsProps } from '../../utils/getDimensionsProps';

const { screenWidth, screenHeight, navbarHeight } = getDimensionsProps();
// @ts-ignore

export const MyLinks = () => {
  const navigation = useNavigation();
  const { getItem } = useAsyncStorage('jwt');
  useEffect(() => {
    getItem().then((accessToken) => {
      console.log(accessToken);

      if (!accessToken) {
        navigation.navigate('Login');
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
      <View style={styles.showMenuButtonContainer}>
        <ShowMenuButton
          name="createNewList"
          navigateTo="NewCategory"
          text="Utwórz nową kategorie"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  showMenuButtonContainer: {
    position: 'relative',
    bottom: navbarHeight + 100,
    left: screenWidth - 100,
    width: 100,
    height: 100,
  },
  container: {
    height: screenHeight,
    backgroundColor: '#f0fffe',
  },
});
