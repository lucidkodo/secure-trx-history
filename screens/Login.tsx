import { View } from 'react-native';
import globalStyles from './styles/global';
import { Button, Text } from '@rneui/themed';

export default function Login() {
  return (
    <View style={globalStyles.container}>
      <Text>Login screen</Text>
      <Button title="tap" />
    </View>
  );
}
