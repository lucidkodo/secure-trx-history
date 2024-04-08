import { TransactionDetails } from '../models/Transaction';

export type ParamList = {
  Login: undefined;
  Dashboard: undefined;
  TransactionDetails: { data: TransactionDetails };
};
