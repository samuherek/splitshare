import { InviteState } from './config';
import { BillUser } from './entity';

export type CreateBillUserInput = {
  billId: string;
  userId: string;
  addedById?: string;
  state?: InviteState;
};

export type BillUserJoin = BillUser & {
  __user__: User;
};
