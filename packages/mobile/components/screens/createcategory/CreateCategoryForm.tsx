import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '../../common/Input';
import { axiosInstance } from '../../../utils/axiosInstance';
import { useToasts } from '../../../hooks/useToasts';
import { useNavigation } from '@react-navigation/native';
import { HTTP_RESPONSES } from '../../../constants/HttpResponses';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { StyleSheet } from 'react-native';

type CreateCategoryInputs = {
  categoryName: string;
};

export const CreateCategoryForm = () => {
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

  const onSubmit: SubmitHandler<CreateCategoryInputs> = async ({ categoryName }) => {
    try {
      const response = (
        await axiosInstance.post('/categories', {
          categoryName,
        })
      ).data;
      if (response.status === HTTP_RESPONSES.CREATED) {
        setError('');
        navigation.navigate('Home');
        dispatch({
          type: 'ShowToast',
          payload: {
            message: 'Pomyślnie utworzono kategorie!',
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
      <Text style={styles.header}>Utwórz nową kategorię podając dla niej nazwe:</Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.info}>Nazwa kategorii:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input value={value} onChangeText={onChange} />
            )}
            name="categoryName"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.categoryName ? <Text>To pole jest wymagane</Text> : null}
        </View>

        <Button onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Utwórz kategorię</Text>
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
