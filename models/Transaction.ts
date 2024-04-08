export enum TransactionType {
  debit = 'DEBIT',
  credit = 'CREDIT',
}

export interface TransactionBase {
  amount: number; // float
  description: string;
  date: Date;
  type: TransactionType;
}

export interface TransactionDetails extends TransactionBase {
  id: string;
  referenceNum: string;
  approvalCode: string;
}
