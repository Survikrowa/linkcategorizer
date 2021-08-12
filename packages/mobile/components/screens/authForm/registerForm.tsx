import React from 'react';
import { Text, Button, View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '../../common/Input';
import { EMAIL_REGEX } from '../../../constants/constants';
import { axiosInstance } from '../../../utils/axiosInstance';

type RegisterFormInputs = {
  username: string;
  password: string;
  email: string;
};

type RegisterFormProps = {
  handleFormChange: (formType: 'login' | 'register') => void;
};

export const RegisterForm = ({ handleFormChange }: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = (await axiosInstance.post('/auth/register')).data;
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text>
        Posiadasz już konto? W takim razie{' '}
        <Text onPress={() => handleFormChange('login')}>zaloguj się</Text>
      </Text>
      <View>
        <Text>Nazwa użytkownika:</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input onChangeText={onChange} value={value} />
          )}
          name="username"
          defaultValue=""
        />
        {errors.username && <Text>To pole jest wymagane</Text>}
      </View>
      <View>
        <Text>E-mail:</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: EMAIL_REGEX,
              message: 'Podany email jest nieprawidłowy',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input keyboardType="email-address" onChangeText={onChange} value={value} />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <Text>To pole jest wymagane</Text>}
        {errors.email?.type === 'pattern' && <Text>{errors.email.message}</Text>}
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
            <Input onChangeText={onChange} value={value} secureTextEntry />
          )}
          name="password"
          defaultValue=""
        />
        {errors.password && <Text>To pole jest wymagane</Text>}
        {errors.password?.type === 'minLength' && <Text>Hasło musi być na minimum 8 znaków</Text>}
      </View>
      <Button title="Zarejestruj się" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
