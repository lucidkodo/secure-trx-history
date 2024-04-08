import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

// state management
import { count } from '../../stores/atoms';
import { useAtom } from 'jotai';

export default function Dashboard() {
  // const [value, setValue] = useAtom(count);

  return (
    <SafeAreaView>
      <Card>
        <Text>Word of the Day</Text>
        <Text>be-nev-o=lent</Text>
        <Text>adjective</Text>
        <Text>
          well meaning and kindly.
          {'"a benevolent smile"'}
        </Text>
        <Button size="sm" type="clear">
          Learn More
        </Button>
      </Card>
    </SafeAreaView>
  );
}
