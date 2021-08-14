import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { axiosInstance } from '../../../../utils/axiosInstance';
import { Input } from '../../../common/Input';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type LoginFormInputs = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onPress: () => void;
};

export const LoginForm = ({ onPress }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    reValidateMode: 'onChange',
  });
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { setItem } = useAsyncStorage('jwt');
  const onSubmit: SubmitHandler<LoginFormInputs> = async ({ username, password }) => {
    try {
      const response = (
        await axiosInstance.post('/auth/login', {
          username,
          password,
        })
      ).data;
      if (response.status === 200) {
        await setItem(response.accessToken);
        setError('');
        navigation.navigate('Home');
      }
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <View>
      <Text>
        Nie posiadasz konta?
        <Text onPress={onPress}>Zarejestruj się!</Text>
      </Text>
      <View>
        <Text>Nazwa uzytkownika:</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input onChangeText={onChange} value={value} />
          )}
          name="username"
          defaultValue=""
        />
        {errors?.username && <Text>To pole jest wymagane</Text>}
      </View>
      <View>
        <Text>Hasło:</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 8,
          }}
          render={({ field: { onChange, value } }) => (
            <Input onChangeText={onChange} value={value} />
          )}
          name="password"
          defaultValue=""
        />
        {errors?.password && <Text>To pole jest wymagane</Text>}
        {errors?.password?.type === 'minLength' && <Text>Hasło musi być na minimum 8 znaków</Text>}
      </View>
      <Button title="Zaloguj się" onPress={handleSubmit(onSubmit)} />
      <Text>{error && error}</Text>
    </View>
  );
};
