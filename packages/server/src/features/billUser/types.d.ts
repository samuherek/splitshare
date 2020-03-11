import { InviteState } from './config';
import { BillUser } from './entity';

export type CreateBillUserInput = {
  billId: string;
  userId: string;
  state?: InviteState;
  invitedById?: string;
};

export type BillUserJoin = BillUser & {
  __user__: User;
};
