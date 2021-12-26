import React from 'react';
import ExpandableFloatingAction from 'react-native-expandable-fab';
import { Text } from 'react-native';
import { Entypo, Foundation } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type ShowMenuButtonProps = {
  navigateTo: 'NewCategory' | 'NewLinkForCategory';
  text: string;
  name: 'createNewList' | 'createNewLink';
};

type ShowMenuButtonNavigation = StackNavigationProp<RootStackParamList>;

export const ShowMenuButton = ({ navigateTo, text, name }: ShowMenuButtonProps) => {
  const navigation = useNavigation<ShowMenuButtonNavigation>();
  return (
    <ExpandableFloatingAction
      mainColor="white"
      secondaryColor="white"
      closeIcon={<Entypo name="cross" size={32} color="black" />}
      openIcon={<Entypo name="dots-three-horizontal" size={24} color="black" />}
      menuIcons={[
        {
          name: name,
          icon: <Foundation name="plus" size={24} color="black" />,
          text: <Text style={styles.iconText}>{text}</Text>,
          callback: () => navigation.navigate(navigateTo),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  iconText: {
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'black',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 2,
  },
});
