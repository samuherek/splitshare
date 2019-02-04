import * as DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Receipt } from '../entity/Receipt';

const batchReceipts = async (keys: string[]) => {
  const receipts = await Receipt.find({
    where: {
      billId: In(keys),
    },
  });

  const billIdToReceipts: { [key: string]: Receipt[] } = {};

  receipts.forEach(r => {
    if (r.billId in billIdToReceipts) {
      billIdToReceipts[r.billId].push(r);
    } else {
      billIdToReceipts[r.billId] = [r];
    }
  });

  return keys.map(k => billIdToReceipts[k]);
};

export const receiptLoader = () => new DataLoader(batchReceipts);
