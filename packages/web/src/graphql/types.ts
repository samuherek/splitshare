export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type Bill = {
  __typename?: 'Bill';
  id: Scalars['ID'];
  name: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['DateTime'];
  closedAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  users: Array<BillUser>;
  myBalance: UserBalance;
};

export type BillConnection = {
  __typename?: 'BillConnection';
  edges: Array<BillEdges>;
  pageInfo: PageInfo;
};

export type BillEdges = {
  __typename?: 'BillEdges';
  node: Bill;
  cursor: Scalars['String'];
};

export type BillsFilter = {
  status?: Maybe<BillStatus>;
};

export enum BillStatus {
  Opened = 'OPENED',
  Closed = 'CLOSED',
}

export type BillUser = {
  __typename?: 'BillUser';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  state: InviteState;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['DateTime'];
  invitedBy: User;
};

export type CreateBillInput = {
  name: Scalars['String'];
  currency: Scalars['String'];
};

export type CreateBillInviteInput = {
  email: Scalars['String'];
  billId: Scalars['ID'];
};

export type CreateReceiptInput = {
  billId: Scalars['ID'];
  title: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  paidAt: Scalars['DateTime'];
  total: Scalars['Float'];
  currency: Scalars['String'];
  paidById: Scalars['ID'];
  splits: Array<SplitInput>;
};

export enum InviteState {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Accepted = 'ACCEPTED',
}

export type MeInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createBill: Bill;
  updateBill: Bill;
  deleteBill: Bill;
  createBillInvite: BillUser;
  removeBillUser: BillUser;
  createReceipt: Receipt;
  deleteReceipt: Receipt;
  updateMe: User;
  setupAccount: Scalars['Boolean'];
};

export type MutationCreateBillArgs = {
  input: CreateBillInput;
};

export type MutationUpdateBillArgs = {
  id: Scalars['ID'];
  input: UpdateBillInput;
};

export type MutationDeleteBillArgs = {
  id: Scalars['ID'];
};

export type MutationCreateBillInviteArgs = {
  input: CreateBillInviteInput;
};

export type MutationRemoveBillUserArgs = {
  input: RemoveBillUserInput;
};

export type MutationCreateReceiptArgs = {
  input: CreateReceiptInput;
};

export type MutationDeleteReceiptArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateMeArgs = {
  meInput: MeInput;
};

export type MutationSetupAccountArgs = {
  input: SetupInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  endCursor: Scalars['String'];
  itemsCount: Scalars['Int'];
};

export type PaginationInput = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  bill?: Maybe<Bill>;
  bills: BillConnection;
  receipt?: Maybe<Receipt>;
  receipts: ReceiptConnection;
  me?: Maybe<User>;
};

export type QueryBillArgs = {
  id: Scalars['ID'];
};

export type QueryBillsArgs = {
  pagination?: Maybe<PaginationInput>;
  filter?: Maybe<BillsFilter>;
};

export type QueryReceiptArgs = {
  id: Scalars['ID'];
};

export type QueryReceiptsArgs = {
  billId: Scalars['ID'];
  pagination?: Maybe<PaginationInput>;
  filter?: Maybe<ReceiptsFilter>;
};

export type Receipt = {
  __typename?: 'Receipt';
  id: Scalars['ID'];
  comment?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  total: Scalars['Float'];
  currency: Scalars['String'];
  paidAt: Scalars['Date'];
  paidBy: User;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['DateTime'];
  isSettlement: Scalars['Boolean'];
  splits: Array<UserSplit>;
};

export type ReceiptConnection = {
  __typename?: 'ReceiptConnection';
  edges: Array<ReceiptEdges>;
  pageInfo: PageInfo;
};

export type ReceiptEdges = {
  __typename?: 'ReceiptEdges';
  node: Receipt;
  cursor: Scalars['String'];
};

export type ReceiptsFilter = {
  name?: Maybe<Scalars['String']>;
};

export type RemoveBillUserInput = {
  billId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type SetupInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
};

export type SplitInput = {
  userId: Scalars['ID'];
  value: Scalars['Float'];
};

export type UpdateBillInput = {
  name?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  closed?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  state: UserState;
};

export type UserBalance = {
  __typename?: 'UserBalance';
  value: Scalars['Float'];
  currency: Scalars['String'];
  user: User;
};

export type UserSplit = {
  __typename?: 'UserSplit';
  user: User;
  value: Scalars['Float'];
  currency: Scalars['String'];
  owingTo: User;
};

export enum UserState {
  OnboardingVerifyEmail = 'ONBOARDING_VERIFY_EMAIL',
  OnboardingProfile = 'ONBOARDING_PROFILE',
  Active = 'ACTIVE',
}