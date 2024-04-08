import { faker } from '@faker-js/faker';
import { TransactionDetails } from '../models/Transaction';
import { generateTransaction } from './helper';
import { useNavigation } from '@react-navigation/native';

export function authenticate(data: {
  email: string;
  password: string;
}): Promise<boolean> {
  return new Promise((res, rej) => {
    if (data.password === 'password') {
      return res(true);
    }

    return rej({ message: 'Incorrect password.' });
  });
}

export function getTransactions(): Promise<TransactionDetails[]> {
  return new Promise((res, rej) => {
    const data: TransactionDetails[] = [];
    for (let i = 0; i < 20; i++) {
      data.push(generateTransaction());
    }
    return res(data);
  });
}

// used on refresh
export function getNewTransactions(): Promise<TransactionDetails[]> {
  const newTrxs = faker.number.int({ min: 0, max: 2 });

  return new Promise((res, rej) => {
    const data: TransactionDetails[] = [];
    for (let i = 0; i < newTrxs; i++) {
      data.push(generateTransaction());
    }
    return res(data);
  });
}
