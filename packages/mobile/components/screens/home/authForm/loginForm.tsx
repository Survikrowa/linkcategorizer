import React from 'react';
import { Button, Text, View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { axiosInstance } from '../../../../utils/axiosInstance';
import { Input } from '../../../common/Input';

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
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = (await axiosInstance.post('/auth/login')).data;
      console.log(response);
    } catch (e) {
      console.log(e);
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
    </View>
  );
};
