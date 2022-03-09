import React from 'react';
import { ScrollView } from 'react-native';
import { NoCategories } from './NoCategories';
import { MyLinksContainer } from './MyLinksContainer';

const MOCK = [
  {
    id: '1',
    name: 'Przepisy',
  },
];

export const HomeScreen = () => {
  return (
    <ScrollView>
      {MOCK.length > 0 ? (
        MOCK.map((item) => <MyLinksContainer item={item} key={item.id} />)
      ) : (
        <NoCategories />
      )}
    </ScrollView>
  );
};
