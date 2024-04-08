import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useErrorBoundary } from 'react-error-boundary';
import { colors } from '../styles/global';
import { Input, Button } from '@rneui/themed';
import { ParamList } from '../../navigation/types';

import * as api from '../../services/api';
import * as LocalAuth from 'expo-local-authentication';

// state management
import { useAtom } from 'jotai';
import { username, userEmail } from '../../stores/user';

export default function Login({ navigation }: StackScreenProps<ParamList>) {
  const { showBoundary } = useErrorBoundary();
  const [name, setName] = useAtom(username);
  const [email, setEmail] = useAtom(userEmail);

  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const onPasswordChange = (value: string) => {
    if (loginError) {
      setLoginError('');
    }

    setPassword(value);
  };

  const passwordLoginHandler = async () => {
    try {
      await api.authenticate({ email, password });
      navigation.navigate('Dashboard');
    } catch (error: unknown) {
      if ((error as Error).message as string) {
        setLoginError((error as Error).message);
      } else {
        showBoundary(error);
      }
    }
  };

  const biometricsLoginHandler = async () => {
    try {
      const result = await LocalAuth.authenticateAsync();
      // console.log(result);
      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }
    } catch (error: unknown) {
      if ((error as Error).message as string) {
        setLoginError((error as Error).message);
      } else {
        showBoundary(error);
      }
    }
  };

  return (
    <View style={styles.formContainer}>
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.h1}>Welcome back, {name}.</Text>
        <Text style={styles.text}>Please login to proceed</Text>
      </View>
      <Input
        onChangeText={(text) => onPasswordChange(text)}
        placeholder="Password"
        secureTextEntry={true}
        errorMessage={loginError}
        inputContainerStyle={{
          marginTop: 20,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button
          isPrimary
          title="Login with password"
          onPress={passwordLoginHandler}
        />
        <Button
          title="Login with biometrics"
          buttonStyle={{ marginTop: 10 }}
          onPress={biometricsLoginHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingVertical: 100,
    paddingHorizontal: 40,
    backgroundColor: colors.lightGreen,
  },
  h1: {
    textAlign: 'left',
    fontSize: 36,
    fontWeight: '700',
  },
  text: {
    marginTop: 8,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '300',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
