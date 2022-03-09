import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useToasts } from '../../../hooks/useToasts';
import { axiosInstance } from '../../../utils/axiosInstance';
import { HTTP_RESPONSES } from '../../../constants/HttpResponses';
import { Card } from '../../common/Card';
import { Text, View } from 'react-native';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { StyleSheet } from 'react-native';

type AddLinkToCategoryInputs = {
  name: string;
  href: string;
};

export const AddLinkToCategoryForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
  });
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { dispatch } = useToasts();

  const onSubmit: SubmitHandler<AddLinkToCategoryInputs> = async ({ name, href }) => {
    try {
      const response = (
        await axiosInstance.post('/categories', {
          name,
          href,
        })
      ).data;
      if (response.status === HTTP_RESPONSES.CREATED) {
        setError('');
        navigation.goBack();
        dispatch({
          type: 'ShowToast',
          payload: {
            message: 'Pomyślnie dodano nowy link!',
            duration: 'LONG',
          },
        });
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Card>
      <Text style={styles.header}>Dodaj nową karte podając jej nazwe oraz linka</Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.info}>Nazwa:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.name ? <Text>To pole jest wymagane</Text> : null}
        </View>
        <View>
          <Text style={styles.info}>Link:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} />
            )}
            name="href"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.href ? <Text>To pole jest wymagane</Text> : null}
        </View>
        <Button onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Dodaj link</Text>
        </Button>
        {error ? <Text>{error}</Text> : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
    flex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
