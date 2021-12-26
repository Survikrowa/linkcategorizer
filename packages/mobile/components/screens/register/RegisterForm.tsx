import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '../../common/Input';
import { EMAIL_REGEX } from '../../../constants/constants';
import { axiosInstance } from '../../../utils/axiosInstance';
import { useNavigation } from '@react-navigation/native';
import { useToasts } from '../../../hooks/useToasts';
import { HTTP_RESPONSES } from '../../../constants/HttpResponses';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type RegisterFormInputs = {
  username: string;
  password: string;
  email: string;
};

type RegisterFormProps = {
  onPress: () => void;
};

type RegisterFormNavigation = StackNavigationProp<RootStackParamList>;

export const RegisterForm = ({ onPress }: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    reValidateMode: 'onChange',
  });
  const [error, setError] = useState('');
  const navigation = useNavigation<RegisterFormNavigation>();
  const { dispatch } = useToasts();
  const onSubmit: SubmitHandler<RegisterFormInputs> = async ({ username, password, email }) => {
    try {
      const response = (
        await axiosInstance.post('/auth/register', {
          username,
          password,
          email,
        })
      ).data;
      if (response.status === HTTP_RESPONSES.CREATED) {
        setError('');
        navigation.navigate('Home');
      }
      dispatch({
        type: 'ShowToast',
        payload: {
          message: response.message,
          duration: 'LONG',
        },
      });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Card>
      <View style={styles.container}>
        <Text onPress={onPress}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.header}>Posiadasz już konto? </Text>
            <Text style={styles.header}>W takim razie </Text>
            <Text style={[styles.header, styles.link]}>zaloguj się</Text>
          </View>
        </Text>
        <View>
          <View>
            <Text style={styles.label}>Nazwa użytkownika:</Text>
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
            <Text style={styles.label}>E-mail:</Text>
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
            <Text style={styles.label}>Hasło:</Text>
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
            {errors.password ? <Text>To pole jest wymagane</Text> : null}
            {errors.password?.type === 'minLength' ? (
              <Text>Hasło musi być na minimum 8 znaków</Text>
            ) : null}
          </View>
        </View>

        <Button onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Zarejestruj się</Text>
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
  headerTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 16,
    marginTop: 8,
  },
});
