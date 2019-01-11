import * as DataLoader from 'dataloader';
import { Bill } from '../entity/Bill';

export const billLoader = () =>
  new DataLoader(async (keys: string[]) => {
    const bills = await Bill.findByIds(keys);

    const billMap: { [key: string]: Bill } = {};

    bills.forEach(u => {
      billMap[u.id] = u;
    });

    // O(n) * O(1)
    return keys.map(k => billMap[k]);
  });
