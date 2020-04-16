import { InviteState } from '../billUser/config';

export type BillStatus = 'OPENED' | 'CLOSED';

export type BillsFilter = {
  status?: BillStatus;
};

export type CreateBillInput = {
  name: string;
  currency: string;
};

export type UserBalanceRaw = {
  userId: string;
  value: number;
  currency: string;
};

export type CreateBillArgs = {
  input: CreateBillInput;
};

export type BillArgs = {
  id: string;
};

export type BillsArgs = {
  pagination?: PaginationArgs;
  filter?: BillsFilter;
};

export type BillInviteInput = {
  email: string;
  billId: string;
};

export type CreateBillInviteArgs = {
  input: BillInviteInput;
};

export type UpdateBillInviteInput = {
  billId: string;
  state: InviteState;
};

export type UpdateBillInviteArgs = {
  input: UpdateBillInviteInput;
};

export type RemoveBillInviteInput = {
  billId: string;
  userId: string;
};

export type RemoveBillInviteArgs = {
  input: RemoveBillInviteInput;
};

export type UpdateBillInput = {
  name?: string;
  currency?: string;
  closed?: boolean;
};

export type UpdateBillModelInput = {
  name?: string;
  currency?: string;
  closedAt?: Date | null;
};

export type UpdateBillArgs = {
  id: string;
  input: UpdateBillInput;
};

export type DeleteBillArgs = {
  id: string;
};
