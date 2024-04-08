import { View } from 'react-native';
import { FallbackProps } from 'react-error-boundary';
import { Text, Button } from '@rneui/themed';
import globalStyles from '../styles/global';

export default function Generic({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <View style={globalStyles.container}>
      <Text>Error: "{error}"</Text>
      <Button
        title="Reset"
        onPress={resetErrorBoundary}
        buttonStyle={{ marginTop: 20, width: 150 }}
      />
    </View>
  );
}
