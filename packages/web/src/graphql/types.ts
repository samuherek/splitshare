export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
  DateTime: any,
};

export type Bill = {
   __typename?: 'Bill',
  id: Scalars['ID'],
  name: Scalars['String'],
  icon?: Maybe<Scalars['String']>,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['DateTime'],
  closedAt?: Maybe<Scalars['DateTime']>,
  currency: Scalars['String'],
  users: Array<Maybe<BillUser>>,
  myBalance: UserBalance,
};

export type BillConnection = {
   __typename?: 'BillConnection',
  edges: Array<BillEdges>,
  pageInfo: PageInfo,
};

export type BillEdges = {
   __typename?: 'BillEdges',
  node: Bill,
  cursor: Scalars['String'],
};

export type BillsFilter = {
  status?: Maybe<BillStatus>,
};

export enum BillStatus {
  Opened = 'OPENED',
  Closed = 'CLOSED'
}

export type BillUser = {
   __typename?: 'BillUser',
  id: Scalars['ID'],
  email: Scalars['String'],
  displayName?: Maybe<Scalars['String']>,
  photoUrl?: Maybe<Scalars['String']>,
  inviteState: InviteState,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['DateTime'],
  invitedBy: User,
};

export type CreateBillInput = {
  name: Scalars['String'],
};

export type CreateInviteInput = {
  email: Scalars['String'],
  billId: Scalars['ID'],
};

export type CreateReceiptInput = {
  billId: Scalars['ID'],
  title: Scalars['String'],
  comment?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  paidAt: Scalars['Date'],
  total: Scalars['Float'],
  currency: Scalars['String'],
  paidById: Scalars['ID'],
  splits: Array<SplitInput>,
};



export enum InviteState {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Accepted = 'ACCEPTED'
}

export type MeInput = {
  displayName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  createBill: Bill,
  createInvite: BillUser,
  createReceipt: Receipt,
  updateMe: User,
};


export type MutationCreateBillArgs = {
  input: CreateBillInput
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput
};


export type MutationCreateReceiptArgs = {
  input: CreateReceiptInput
};


export type MutationUpdateMeArgs = {
  meInput: MeInput
};

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  endCursor: Scalars['String'],
};

export type PaginationInput = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  bill?: Maybe<Bill>,
  bills: BillConnection,
  receipt?: Maybe<Receipt>,
  receipts: ReceiptConnection,
  me?: Maybe<User>,
};


export type QueryBillArgs = {
  id: Scalars['ID']
};


export type QueryBillsArgs = {
  pagination?: Maybe<PaginationInput>,
  filter?: Maybe<BillsFilter>
};


export type QueryReceiptArgs = {
  id: Scalars['ID']
};


export type QueryReceiptsArgs = {
  billId: Scalars['ID'],
  pagination?: Maybe<PaginationInput>
};

export type Receipt = {
   __typename?: 'Receipt',
  id: Scalars['ID'],
  comment?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  total: Scalars['Float'],
  currency: Scalars['String'],
  paidAt: Scalars['Date'],
  paidBy: User,
  createdAt: Scalars['Date'],
  updatedAt: Scalars['DateTime'],
  isSettlement: Scalars['Boolean'],
  splits: Array<UserSplit>,
};

export type ReceiptConnection = {
   __typename?: 'ReceiptConnection',
  edges: Array<ReceiptEdges>,
  pageInfo: PageInfo,
};

export type ReceiptEdges = {
   __typename?: 'ReceiptEdges',
  node: Receipt,
  cursor: Scalars['String'],
};

export type SplitInput = {
  userId: Scalars['ID'],
  value: Scalars['Float'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  displayName?: Maybe<Scalars['String']>,
  photoUrl?: Maybe<Scalars['String']>,
};

export type UserBalance = {
   __typename?: 'UserBalance',
  value: Scalars['Float'],
  currency: Scalars['String'],
  user: User,
};

export type UserSplit = {
   __typename?: 'UserSplit',
  user: User,
  value: Scalars['Float'],
  currency: Scalars['String'],
  owingTo: User,
};

