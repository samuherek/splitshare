export type Maybe<T> = T | null;

export interface FilterInput {
  offset?: Maybe<number>;

  limit?: number;
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

  paidAt: DateTime;

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

  billDepts: UserDept[];

  myBills: Bill[];

  myPendingInvites: BillInvite[];

  receipt: Receipt;

  receipts: ReceiptsResponse;

  me?: Maybe<User>;
}

export interface Bill {
  id: string;

  name: string;

  cover?: Maybe<string>;

  icon?: Maybe<string>;

  createdAt: DateTime;

  updatedAt: DateTime;

  users: User[];

  receipts?: Maybe<Receipt[]>;

  invites?: Maybe<BillInvite[]>;
}

export interface User {
  id: string;

  email: string;

  displayName?: Maybe<string>;

  photoUrl?: Maybe<string>;
}

export interface Receipt {
  id: string;

  comment?: Maybe<string>;

  category?: Maybe<string>;

  company?: Maybe<string>;

  country?: Maybe<string>;

  total: number;

  currency: string;

  paidAt: DateTime;

  createdAt: DateTime;

  updatedAt: DateTime;

  paidBy: User;

  creator: User;

  splits: ReceiptSplit[];
}

export interface ReceiptSplit {
  id: string;

  value: number;

  currency: string;

  user: User;
}

export interface BillInvite {
  id: string;

  email: string;

  pending: boolean;

  createdAt: DateTime;

  deletedAt?: Maybe<DateTime>;

  invitedBy: User;

  bill: Bill;
}

export interface UserDept {
  userId: string;

  sum: number;

  currency: string;

  owingToId: string;
}

export interface ReceiptsResponse {
  hasMore: boolean;

  receipts: Receipt[];
}

export interface Mutation {
  createBill: Bill;

  removeBill: boolean;

  updateBill: Bill;

  acceptBillInvite: boolean;

  createBillInvite: boolean;

  rejectBillInvite: boolean;

  removeBillInvite: boolean;

  createReceipt: Receipt;

  removeReceipt: boolean;

  login: boolean;

  logout: boolean;

  register: boolean;

  updateMe: User;
}

export interface BillUser {
  id: string;
}

// ====================================================
// Arguments
// ====================================================

export interface BillQueryArgs {
  id: string;
}
export interface BillDeptsQueryArgs {
  id: string;
}
export interface ReceiptQueryArgs {
  id: string;
}
export interface ReceiptsQueryArgs {
  where: FilterInput;

  billId: string;
}
export interface CreateBillMutationArgs {
  name: string;
}
export interface RemoveBillMutationArgs {
  id: string;
}
export interface UpdateBillMutationArgs {
  name?: Maybe<string>;

  icon?: Maybe<string>;

  billId: string;
}
export interface AcceptBillInviteMutationArgs {
  id: string;
}
export interface CreateBillInviteMutationArgs {
  billId: string;

  email: string;
}
export interface RejectBillInviteMutationArgs {
  id: string;
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
