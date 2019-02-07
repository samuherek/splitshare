import * as DataLoader from 'dataloader';
import { In } from 'typeorm';
import { ReceiptSplit } from '../entity/ReceiptSplit';

const batchReceiptSplits = async (receiptIds: string[]) => {
  const receiptSplits = await ReceiptSplit.find({
    where: {
      receiptId: In(receiptIds),
    },
  });

  const receiptSplitsMap: { [key: string]: ReceiptSplit[] } = {};

  receiptSplits.forEach(rs => {
    if (rs.receiptId in receiptSplitsMap) {
      receiptSplitsMap[rs.receiptId].push(rs);
    } else {
      receiptSplitsMap[rs.receiptId] = [rs];
    }
  });

  return receiptIds.map(receiptId => receiptSplitsMap[receiptId]);
};

export const receiptSplitsLoader = () => new DataLoader(batchReceiptSplits);
