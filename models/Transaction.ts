export enum TransactionType {
  debit = 'DEBIT',
  credit = 'CREDIT',
}

export interface TransactionBase {
  amount: number; // float
  description: string;
  date: string;
  type: TransactionType;
}

export interface TransactionDetails extends TransactionBase {
  id: string;
  referenceNum: string;
  approvalCode: string;
  details: string;
}
