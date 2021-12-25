import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { axiosInstance } from '../../../utils/axiosInstance';
import { Input } from '../../common/Input';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../../types';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';

type LoginFormInputs = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onPress: () => void;
};

type LoginScreenNavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginForm = ({ onPress }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    reValidateMode: 'onChange',
  });
  const [error, setError] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProps>();
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
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    }
  };
  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.header} onPress={onPress}>
          Nie posiadasz konta?
          <Text style={styles.link}> Zarejestruj się!</Text>
        </Text>
        <View>
          <View>
            <Text style={styles.label}>Nazwa uzytkownika:</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input onChangeText={onChange} value={value} />
              )}
              name="username"
              defaultValue=""
            />
            {errors?.username ? <Text>To pole jest wymagane</Text> : null}
          </View>
          <View>
            <Text style={styles.label}>Hasło:</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field: { onChange, value } }) => (
                <Input onChangeText={onChange} value={value} textContentType="password" />
              )}
              name="password"
              defaultValue=""
            />
            {errors?.password ? <Text>To pole jest wymagane</Text> : null}
            {errors?.password?.type === 'minLength' ? (
              <Text>Hasło musi być na minimum 8 znaków</Text>
            ) : null}
          </View>
        </View>

        <Button onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Zaloguj się</Text>
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
    justifyContent: 'space-evenly',
    height: 100,
    flex: 1,
    marginTop: -100,
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
  label: {
    fontWeight: 'bold',
  },
  link: {
    color: '#00A790',
  },
});
