import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

type InputProps = {
  value: string;
} & TextInputProps;

export const Input = ({ onChangeText, value, ...props }: InputProps) => {
  return <TextInput onChangeText={onChangeText} value={value} {...props} />;
};
