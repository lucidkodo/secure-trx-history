export enum CardType {
  debit = 'DEBIT',
  credit = 'CREDIT',
}

export function isCardTypeValid(type?: unknown): type is CardType {
  return type === CardType;
}

export interface BankCard {
  cardName: string;
  number: string;
  cvv: string;
  expiry: string; // 'YY/MM'
}

export interface CreditCard extends BankCard {
  type: CardType.credit;
  creditLimit: number;
}

export interface DebitCard extends BankCard {
  type: CardType.debit;
  creditLimit: never;
}
