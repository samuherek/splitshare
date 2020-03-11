import { inviteState } from './config';

export type CreateBillUserInput = {
  billId: string;
  userId: string;
  state?: keyof typeof inviteState;
  invitedById?: string;
};
