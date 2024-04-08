import { TransactionDetails } from '../models/Transaction';
import { generateTransaction } from './helper';

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
