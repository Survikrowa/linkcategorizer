import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from '../../components/screens/home/HomeScreen';
import { ShowMenuButton } from '../../components/screens/components/ShowMenuButton';
import { StyleSheet, View } from 'react-native';
import { getDimensionsProps } from '../../utils/getDimensionsProps';

const { screenWidth, screenHeight, navbarHeight } = getDimensionsProps();

export const MyLinks = () => {
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
