import { PaginationArgs } from '../../types.d';

export type ReceiptArgs = {
  id: string;
};

export type ReceiptsFilter = {
  name?: string;
};

export type ReceiptsArgs = {
  billId: string;
  pagination?: PaginationArgs;
  filter?: ReceiptsFilter;
};

export type SplitInput = {
  userId: string;
  value: number;
};

export type UserSplitRaw = {
  userId: string;
  value: number;
  currency: string;
  paidById: string;
};

export type CreateReceiptInput = {
  billId: string;
  title: string;
  comment?: string;
  category?: string;
  paidAt: Date;
  total: number;
  currency: string;
  splits: SplitInput[];
};

export interface CreateReceiptArgs {
  input: CreateReceiptInput;
}

export type DeleteReceiptArgs = {
  id: string;
};
