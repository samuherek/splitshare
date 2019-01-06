export type Maybe<T> = T | null;

export interface RegisterInput {
  email: string;

  password: string;
}

export interface MeInput {
  displayName?: Maybe<string>;

  email?: Maybe<string>;
}

export interface BillInput {
  name: string;

  users?: Maybe<string[]>;
}

export interface ReceiptSplitInput {
  userId: string;

  value: number;
}

export interface ReceiptInput {
  company: string;

  comment?: Maybe<string>;

  category?: Maybe<string>;

  country?: Maybe<string>;

  paidById: string;

  total: number;

  currency: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: Maybe<User>;

  myBills: Bill[];

  bill: Bill;

  receipt: Receipt;

  receipts: ReceiptsResponse;
}

export interface User {
  id: string;

  email: string;

  displayName?: Maybe<string>;

  photoUrl?: Maybe<string>;

  createdAt: DateTime;
}

export interface Bill {
  id: string;

  name: string;

  creator: User;

  createdAt: DateTime;

  updatedAt: DateTime;

  users: User[];
}

export interface Receipt {
  id: string;

  comment?: Maybe<string>;

  category?: Maybe<string>;

  company: string;

  country?: Maybe<string>;

  paidBy: User;

  total: number;

  currency: string;

  creator: User;

  createdAt: DateTime;

  updatedAt: DateTime;

  splits: ReceiptSplit[];
}

export interface ReceiptSplit {
  id: string;

  value: number;

  currency: string;

  userId: string;

  user: User;

  receiptId: string;

  receipt: Receipt;
}

export interface ReceiptsResponse {
  hasMore: boolean;

  receipts: Receipt[];
}

export interface Mutation {
  register: boolean;

  login: boolean;

  logout: boolean;

  updateMe: User;

  createBill: Bill;

  createReceipt: Receipt;
}

// ====================================================
// Arguments
// ====================================================

export interface BillQueryArgs {
  id: string;
}
export interface ReceiptQueryArgs {
  id: string;
}
export interface ReceiptsQueryArgs {
  offset: number;

  limit: number;

  billId: string;
}
export interface RegisterMutationArgs {
  registerInput: RegisterInput;
}
export interface LoginMutationArgs {
  password: string;

  email: string;
}
export interface UpdateMeMutationArgs {
  meInput: MeInput;
}
export interface CreateBillMutationArgs {
  billInput: BillInput;
}
export interface CreateReceiptMutationArgs {
  splitsInput: ReceiptSplitInput[];

  receiptInput: ReceiptInput;
}
