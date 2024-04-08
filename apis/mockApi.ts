import { faker } from '@faker-js/faker';
import { TransactionDetails } from '../models/Transaction';
import { generateCard, generateTransaction } from './helper';
import { CreditCard, DebitCard } from '../models/BankCard';

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

export function getCad(): Promise<CreditCard | DebitCard> {
  return new Promise((res, rej) => {
    return res(generateCard());
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
