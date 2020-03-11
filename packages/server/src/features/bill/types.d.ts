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
