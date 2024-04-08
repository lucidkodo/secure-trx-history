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
import { getTransactions } from '../../services/api';
import TransactionItem from './components/TransactionItem';
import useRefresh from './hooks/useRefresh';
import { TransactionDetails } from '../../models/Transaction';
import { useErrorBoundary } from 'react-error-boundary';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../navigation/types';
import { CreditCard, DebitCard } from '../../models/BankCard';
import { generateCard } from '../../services/helper';
import { useAtom } from 'jotai';
import { isAuthenticated } from '../../stores/user';
import * as LocalAuth from 'expo-local-authentication';
import BankCard from './components/Card';

export default function Dashboard({ navigation }: StackScreenProps<ParamList>) {
  const { showBoundary } = useErrorBoundary();
  const { refreshing, onRefresh, newTransactions } = useRefresh();
  const [displayInfo, setDisplayInfo] = useAtom(isAuthenticated);
  const [card, setCard] = useState<Partial<CreditCard | DebitCard>>({
    number: '',
    cvv: '',
    expiry: '',
  });
  const [trxs, setTrxs] = useState<TransactionDetails[]>([]);

  const cardDetails = () => {
    if (displayInfo) {
      return card;
    }

    return {
      number: card.number!.replace(/[0-9]/g, 'X'),
      cvv: card.cvv!.replace(/[0-9]/g, 'X'),
      expiry: card.expiry!.replace(/[0-9]/g, 'X'),
    };
  };

  const cardPressHandler = async () => {
    if (displayInfo) {
      return;
    }

    try {
      const result = await LocalAuth.authenticateAsync();
      if (result.success) {
        setDisplayInfo(true);
      }
    } catch (error: unknown) {
      showBoundary(error);
    }
  };

  const logout = () => {
    setDisplayInfo(false);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const trxPressHandler = (trx: TransactionDetails) => {
    navigation.push('TransactionDetails', { data: trx });
  };

  useEffect(() => {
    async function loadData() {
      try {
        const newCard = await generateCard();
        setCard(newCard);

        const transactions = await getTransactions();
        setTrxs(transactions);
      } catch (error) {
        showBoundary(error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    setTrxs(() => {
      return [...newTransactions, ...trxs];
    });
  }, [newTransactions]);

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.cardSection}>
        <TouchableOpacity onPress={cardPressHandler}>
          <BankCard
            cardNumber={cardDetails().number}
            cardExp={cardDetails().expiry}
            cardCvv={cardDetails().cvv}
          />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: colors.darkGreen }}>
        <Text style={styles.banner}>Transactions</Text>
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
      <TouchableOpacity style={styles.floatingBtn} onPress={logout}>
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
  banner: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.grey1,
    paddingVertical: 10,
  },
  floatingBtn: {
    position: 'absolute',
    backgroundColor: colors.primaryYellow,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    bottom: 30,
    right: 30,
    borderRadius: 100,
  },
});
