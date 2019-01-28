export type Maybe<T> = T | null;

export interface BillInput {
  name: string;
}

export interface InviteInput {
  email: string;

  billId: string;
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

export interface MeInput {
  displayName?: Maybe<string>;

  email?: Maybe<string>;
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
  bill: Bill;

  myBills: Bill[];

  myPendingInvites: BillInvite[];

  receipt: Receipt;

  receipts: ReceiptsResponse;

  me?: Maybe<User>;
}

export interface Bill {
  id: string;

  name: string;

  creator: User;

  createdAt: DateTime;

  updatedAt: DateTime;

  users: User[];

  invites: BillInvite[];
}

export interface User {
  id: string;

  email: string;

  displayName?: Maybe<string>;

  photoUrl?: Maybe<string>;

  createdAt: DateTime;

  billInvites: BillInvite[];
}

export interface BillInvite {
  id: string;

  pending: boolean;

  createdAt: DateTime;

  deletedAt?: Maybe<DateTime>;

  invitedBy: User;

  bill: Bill;
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

  receiptId: string;

  receipt: Receipt;

  userId: string;

  user: User;
}

export interface ReceiptsResponse {
  hasMore: boolean;

  receipts: Receipt[];
}

export interface Mutation {
  createBill: Bill;

  removeBill: boolean;

  acceptBillInvite: boolean;

  createBillInvite: boolean;

  removeBillInvite: boolean;

  createReceipt: Receipt;

  removeReceipt: boolean;

  login: boolean;

  logout: boolean;

  register: boolean;

  updateMe: User;
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
  offset?: Maybe<number>;

  limit?: number;
}
export interface CreateBillMutationArgs {
  billInput: BillInput;
}
export interface RemoveBillMutationArgs {
  id: string;
}
export interface AcceptBillInviteMutationArgs {
  id: string;
}
export interface CreateBillInviteMutationArgs {
  inviteInput: InviteInput;
}
export interface RemoveBillInviteMutationArgs {
  id: string;
}
export interface CreateReceiptMutationArgs {
  billId: string;

  splitsInput: ReceiptSplitInput[];

  receiptInput: ReceiptInput;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
}
export interface RegisterMutationArgs {
  email: string;

  password: string;
}
export interface UpdateMeMutationArgs {
  meInput: MeInput;
}
