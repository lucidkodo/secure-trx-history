import { useEffect, useState, ComponentProps, createRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useErrorBoundary } from 'react-error-boundary';
import { colors } from '../styles/global';
import { Input, Button } from '@rneui/themed';
import { CompositeNavigationProp } from '@react-navigation/native';

import { generateCard, generateTransaction } from '../../apis/helper';
import * as api from '../../apis/mockApi';

// state management
import { useAtom } from 'jotai';
import { username, userEmail } from '../../stores/user';

type LoginProps = ComponentProps<any> &
  CompositeNavigationProp<any, any> & {
    message: string;
  };

export default function Login({ navigation }: LoginProps) {
  const { showBoundary } = useErrorBoundary();
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useAtom(username);
  const [email, setEmail] = useAtom(userEmail);
  const [loginError, setLoginError] = useState<string>('');

  const pressHandler = () => {
    console.log('bio');
  };

  const onPasswordChange = (value: string) => {
    if (loginError) {
      setLoginError('');
    }

    setPassword(value);
  };

  const passwordLoginHandler = async () => {
    try {
      await api.authenticate({ email, password });
      navigation.push('Dashboard');
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
          onPress={pressHandler}
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
