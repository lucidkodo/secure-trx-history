import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../navigation/types';
import { colors } from '../styles/global';
import { TransactionType } from '../../models/Transaction';
import dayjs from 'dayjs';

export default function TransactionDetails({
  navigation,
  route,
}: StackScreenProps<ParamList>) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <Text
          h3
          style={{
            textAlign: 'right',
            fontWeight: 'bold',
            color:
              data.type === TransactionType.credit
                ? colors.negative
                : colors.positive,
          }}
        >
          {data.type === TransactionType.credit ? '-' : '+'}
          {data.amount}
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {data.description}
            <Text style={{ fontStyle: 'italic' }}>
              ({dayjs(data.date).fromNow()})
            </Text>
          </Text>
          <Text>
            <Text style={styles.boldText}>REF: </Text>
            {data.referenceNum}
          </Text>
          <Text>
            <Text style={styles.boldText}>APPV: </Text>
            {data.approvalCode}
          </Text>
          <Text>
            <Text style={styles.boldText}>DETAILS: </Text>
            {data.details}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
