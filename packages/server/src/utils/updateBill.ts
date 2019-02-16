import { getConnection } from 'typeorm';
import { Bill } from '../entity/Bill';
import { Receipt } from '../entity/Receipt';

interface IOpts {
  billId?: string;
  receiptId?: string;
}

const updateBillTimestamp = async ({
  billId,
  receiptId,
}: IOpts): Promise<any> => {
  let bId = billId;

  // TODO: We need to optimize this because we are calling things too many times.
  if (receiptId) {
    const res = await Receipt.findOne({ id: receiptId });
    if (res) {
      bId = res.billId;
    }
  }

  return getConnection()
    .createQueryBuilder()
    .update(Bill)
    .set({})
    .where('id = :id', { id: bId })
    .execute();
};

export default updateBillTimestamp;
