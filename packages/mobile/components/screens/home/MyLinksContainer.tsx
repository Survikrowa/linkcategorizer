import { Text, View } from 'react-native';
import { ButtonCard } from '../../common/ButtonCard';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../../types';

type MyLinksContainerProps = {
  item: {
    name: string;
  };
};
type HomeScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'MyLink'>;

export const MyLinksContainer = ({ item: { name } }: MyLinksContainerProps) => {
  const navigation = useNavigation<HomeScreenNavigationProps>();

  return (
    <View style={styles.categoryContainer}>
      <ButtonCard
        onPress={() =>
          navigation.navigate('MyLink', {
            name,
          })
        }
      >
        <Text style={styles.text}>{name}</Text>
      </ButtonCard>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 16,
    maxHeight: 100,
    textTransform: 'uppercase',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
