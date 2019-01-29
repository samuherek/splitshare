import * as DataLoader from 'dataloader';
import { BillInvite } from '../entity/BillInvite';
import { In } from 'typeorm';

const batchBillInvites = async (keys: string[]) => {
  const billInvites = await BillInvite.find({
    where: {
      billId: In(keys),
      deletedAt: null,
      pending: true,
    },
  });

  const billIdToBillInvites: { [key: string]: BillInvite[] } = {};

  billInvites.forEach(bi => {
    if (bi.billId in billIdToBillInvites) {
      billIdToBillInvites[bi.billId].push(bi);
    } else {
      billIdToBillInvites[bi.billId] = [bi];
    }
  });

  return keys.map(k => billIdToBillInvites[k]);
};

export const billInvitesLoader = () => new DataLoader(batchBillInvites);
