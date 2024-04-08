import { Text, Card } from '@rneui/themed';
import { colors } from '../../styles/global';

interface TrxDetails {
  amount?: string;
  description?: string;
  date?: string;
  type?: string;
}

export default function TransactionItem({
  amount,
  description,
  date,
  type,
}: TrxDetails) {
  return (
    <Card
      containerStyle={{
        backgroundColor: colors.grey2,
        borderWidth: 0,
        borderRadius: 4,
        margin: 0,
      }}
    >
      <Text
        h4
        style={{
          textAlign: 'right',
          fontWeight: '600',
          color: type === 'CREDIT' ? colors.negative : colors.positive,
        }}
      >
        {type === 'CREDIT' ? '-' : '+'}
        {amount}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>{description}</Text>
      <Text style={{ color: 'grey', fontStyle: 'italic' }}>{date}</Text>
    </Card>
  );
}
