import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ButtonCard } from '../../common/ButtonCard';
import * as WebBrowser from 'expo-web-browser';
import { NoCategories } from '../home/NoCategories';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ParamList } from '../../../types';

const MOCK = [
  {
    id: '1',
    name: 'Przepis na Kurczaka na kwaśno',
    href: 'https://www.przepisy.pl/przepisy/szukaj/kurczak-na-kwasno',
  },
];

export const MyLinkContainer = () => {
  const { params } = useRoute<RouteProp<ParamList, 'MyLink'>>();

  return (
    <ScrollView>
      {MOCK.length > 0 ? (
        MOCK.map((item) => (
          <View style={styles.categoryContainer} key={item.id}>
            <ButtonCard onPress={() => WebBrowser.openBrowserAsync(item.href)}>
              <Text style={styles.text}>{item.name}</Text>
            </ButtonCard>
          </View>
        ))
      ) : (
        <NoCategories />
      )}
    </ScrollView>
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
