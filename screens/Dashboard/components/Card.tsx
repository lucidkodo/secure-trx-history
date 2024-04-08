import { View } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { colors } from '../../styles/global';

interface CardProps {
  cardNumber?: string;
  cardCvv?: string;
  cardExp?: string;
}

export default function BankCard({ cardNumber, cardExp, cardCvv }: CardProps) {
  return (
    <Card
      containerStyle={{
        backgroundColor: colors.primaryYellow,
        maxWidth: 320,
        width: '80%',
        paddingTop: 80,
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.darkGreen,
      }}
    >
      <Text
        h4
        style={{
          textAlign: 'right',
          marginBottom: 20,
          fontWeight: '500',
        }}
      >
        {cardNumber}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            textAlign: 'right',
            fontStyle: 'italic',
          }}
        >
          {cardExp}
        </Text>
        <Text
          style={{
            textAlign: 'right',
            fontStyle: 'italic',
          }}
        >
          {cardCvv}
        </Text>
      </View>
    </Card>
  );
}
