import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import {
  CreditCard,
  CardType,
  DebitCard,
  isCardTypeValid,
} from '../models/BankCard';
import { TransactionDetails, TransactionType } from '../models/Transaction';

export function generateCard(type?: CardType): CreditCard | DebitCard {
  // typeguard which card type to create
  if (isCardTypeValid(type) === false) {
    const cardType = faker.number.int({
      min: 0,
      max: Object.values(CardType).length - 1,
    });

    type = Object.values(CardType)[cardType];
  }

  const card: Partial<CreditCard | DebitCard> = {
    cardName: faker.finance.accountName(),
    number: faker.finance.creditCardNumber(),
    cvv: faker.finance.creditCardCVV(),
    expiry: dayjs(faker.date.future({ years: 2 })).format('YY/MM'),
    type,
  };

  // add credit limit info should the new card is of credit type
  if (card.type === CardType.credit) {
    const limit = faker.number.int({ min: 5, max: 10 });
    card.creditLimit = limit * 1000;
    return card as CreditCard;
  }

  return card as DebitCard;
}

export function generateTransaction(): TransactionDetails {
  const trxType = faker.number.int({
    min: 0.01,
    max: Object.values(TransactionType).length - 1,
  });

  return {
    id: faker.git.commitSha({ length: 10 }),
    amount: faker.number.float({ fractionDigits: 2, min: 0, max: 1000 }),
    date: faker.date.recent({ days: 10 }),
    type: Object.values(TransactionType)[trxType],
    description: faker.commerce.productName(),
    referenceNum: 'ref-' + faker.finance.accountNumber({ length: 5 }),
    approvalCode: String(faker.finance.accountNumber({ length: 6 })),
  } satisfies TransactionDetails;
}

export function concealCardNumber(cardNumber: string) {
  // const chunkSize = 4;
  // const numbers = cardNumber.split('');
  // const chunked: string[] = [];
  // for (let i = 0; i < numbers.length; i += chunkSize) {
  //   chunked.push(numbers.slice(i, i + chunkSize).join(''));
  // }
  // console.log(chunked);
  // return chunked.join('');
}

export function errorPromise() {
  return new Promise((res, rej) => {
    return rej('no');
  });
}
