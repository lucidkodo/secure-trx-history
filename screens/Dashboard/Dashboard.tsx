import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text, Icon } from '@rneui/themed';
import dayjs from 'dayjs';
import { colors } from '../styles/global';
import { getTransactions } from '../../apis/mockApi';
import BankCard from './components/Card';
import TransactionItem from './components/TransactionItem';
import useRefresh from './hooks/useRefresh';
import { TransactionDetails } from '../../models/Transaction';
import { useErrorBoundary } from 'react-error-boundary';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../navigation/types';

export default function Dashboard({ navigation }: StackScreenProps<ParamList>) {
  const { showBoundary } = useErrorBoundary();
  const { refreshing, onRefresh, newTransactions } = useRefresh();
  const [trxs, setTrxs] = useState<TransactionDetails[]>([]);

  const logout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const trxPressHandler = (trx: TransactionDetails) => {
    navigation.push('TransactionDetails', { data: trx });
  };

  useEffect(() => {
    async function loadTransactions() {
      try {
        const transactions = await getTransactions();
        setTrxs(transactions);
      } catch (error) {
        showBoundary(error);
      }
    }
    loadTransactions();
  }, []);

  useEffect(() => {
    setTrxs(() => {
      return [...newTransactions, ...trxs];
    });
  }, [newTransactions]);

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.cardSection}>
        <TouchableOpacity onPress={() => console.log('show/hide')}>
          <BankCard
            cardNumber="1234-5678-9876-0987"
            cardExp="03/26"
            cardCvv="879"
          />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: colors.darkGreen }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: colors.grey1,
            paddingVertical: 10,
          }}
        >
          Transactions
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {trxs.map((trx, index) => (
          <TouchableOpacity key={index} onPress={() => trxPressHandler(trx)}>
            <TransactionItem
              amount={trx.amount.toFixed(2)}
              description={trx.description}
              date={dayjs(trx.date).format('YYYY MMM DD')}
              type={trx.type}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: colors.primaryYellow,
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          bottom: 30,
          right: 30,
          borderRadius: 100,
        }}
        onPress={logout}
      >
        <Icon name="logout" color={colors.darkGreen} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.lightGreen,
    flex: 1,
  },
  cardSection: { alignItems: 'center', marginBottom: 20 },
});
