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

  console.log(receiptSplits);

  receiptSplits.forEach(rc => {
    if (rc.receiptId in receiptSplitsMap) {
      receiptSplitsMap[rc.receiptId].push((rc as any).__receiptSplit__);
    } else {
      receiptSplitsMap[rc.receiptId] = [(rc as any).__receiptSplit__];
    }
  });

  return receiptIds.map(receiptId => receiptSplitsMap[receiptId]);
};

export const receiptSplitsLoader = () => new DataLoader(batchReceiptSplits);
