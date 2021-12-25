import React from 'react';
import { Dimensions, TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native';

type InputProps = {
  value: string;
} & TextInputProps;
const ScreenWidth = Dimensions.get('window').width;
export const Input = ({ onChangeText, value, ...props }: InputProps) => {
  return <TextInput style={styles.input} onChangeText={onChangeText} value={value} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: ScreenWidth - 200,
    marginTop: 10,
    padding: 8,
  },
});
