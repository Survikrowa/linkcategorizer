import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { ShowMenuButton } from '../../components/screens/components/ShowMenuButton';
import { MyLinkContainer } from '../../components/screens/myLink/myLinkContainer';
import { getDimensionsProps } from '../../utils/getDimensionsProps';

const { navbarHeight, screenWidth } = getDimensionsProps();

export const ScreenHeight = Dimensions.get('window').height;
export const MyLink = () => {
  return (
    <SafeAreaView style={styles.myLinkContainer}>
      <MyLinkContainer />
      <View style={styles.showMenuButtonContainer}>
        <ShowMenuButton
          name="createNewLink"
          navigateTo="NewLinkForCategory"
          text="Dodaj nowy link"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  showMenuButtonContainer: {
    position: 'relative',
    bottom: navbarHeight + 20,
    left: screenWidth - 100,
    width: 100,
    height: 100,
  },
  myLinkContainer: {
    backgroundColor: '#f0fffe',
    height: ScreenHeight,
  },
});
