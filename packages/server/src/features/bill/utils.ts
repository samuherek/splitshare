import { Receipt } from '../receipt/entity';

type Balance = { [userId: string]: number };

export function receiptIntoBalance(receipt: Receipt): Balance {
  const paidById = receipt.paidById;

  let data: { [userId: string]: number } = {};

  Object.entries(receipt.splits).forEach(([userId, value]) => {
    if (paidById === userId) {
      data[userId] = receipt.total - value;
    } else {
      data[userId] = -Math.abs(value);
    }
  });

  return data;
}

export function reduceIntoBalance(balances: Balance[]): Balance {
  return balances.reduce((acc, next) => {
    Object.entries(next).forEach(([userId, value]) => {
      const currSum = acc[userId] || 0;
      acc[userId] = currSum + value;
    });
    return acc;
  }, {});
}
