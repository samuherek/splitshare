export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  Upload: any;
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

export type BillInvite = {
  __typename?: 'BillInvite';
  id: Scalars['ID'];
  state: InviteState;
  createdAt: Scalars['Date'];
  user: User;
  bill: Bill;
  invitedBy: User;
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
};

export type ClearNotificationsInput = {
  type: ClearType;
};

export enum ClearType {
  Seen = 'SEEN',
  Read = 'READ',
}

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

export type CreateUserInput = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  state?: Maybe<UserState>;
};

export type ImportBillInput = {
  data: Scalars['String'];
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
  createBillInvite: BillInvite;
  removeBillUser: BillUser;
  updateBillInvite: BillInvite;
  importBill: Bill;
  updateNotification: Notification;
  clearNotifications: Scalars['Boolean'];
  createReceipt: Receipt;
  deleteReceipt: Receipt;
  updateReceipt: Receipt;
  updateMe: User;
  setupAccount: Scalars['Boolean'];
  createUser: User;
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

export type MutationUpdateBillInviteArgs = {
  input: UpdateBillInviteInput;
};

export type MutationImportBillArgs = {
  input: ImportBillInput;
};

export type MutationUpdateNotificationArgs = {
  id: Scalars['ID'];
  input: UpdateNotificationInput;
};

export type MutationClearNotificationsArgs = {
  input: ClearNotificationsInput;
};

export type MutationCreateReceiptArgs = {
  input: CreateReceiptInput;
};

export type MutationDeleteReceiptArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateReceiptArgs = {
  id: Scalars['ID'];
  input: UpdateReceiptInput;
};

export type MutationUpdateMeArgs = {
  meInput: MeInput;
};

export type MutationSetupAccountArgs = {
  input: SetupInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  isSeen: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  action: NotificationAction;
  entityType: NotificationType;
  actor: User;
  entity: NotificationEntity;
};

export enum NotificationAction {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED',
  Archived = 'ARCHIVED',
}

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdges>;
  pageInfo: PageInfo;
};

export type NotificationEdges = {
  __typename?: 'NotificationEdges';
  node: Notification;
  cursor: Scalars['String'];
};

export type NotificationEntity = BillInvite;

export type NotificationsFilter = {
  isRead?: Maybe<Scalars['Boolean']>;
  isSeen?: Maybe<Scalars['Boolean']>;
};

export enum NotificationType {
  Bill = 'BILL',
  BillInvite = 'BILL_INVITE',
  Receipt = 'RECEIPT',
}

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
  notifications: NotificationConnection;
  notificationsCount: Scalars['Int'];
  receipt?: Maybe<Receipt>;
  receipts: ReceiptConnection;
  me?: Maybe<User>;
  myUsers: Array<User>;
};

export type QueryBillArgs = {
  id: Scalars['ID'];
};

export type QueryBillsArgs = {
  pagination?: Maybe<PaginationInput>;
  filter?: Maybe<BillsFilter>;
};

export type QueryNotificationsArgs = {
  pagination?: Maybe<PaginationInput>;
};

export type QueryNotificationsCountArgs = {
  filter?: Maybe<NotificationsFilter>;
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
  title: Scalars['String'];
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

export type UpdateBillInviteInput = {
  billId: Scalars['ID'];
  state: InviteState;
};

export type UpdateNotificationInput = {
  isRead?: Maybe<Scalars['Boolean']>;
  isSeen?: Maybe<Scalars['Boolean']>;
};

export type UpdateReceiptInput = {
  title?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  paidAt?: Maybe<Scalars['DateTime']>;
  total?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  paidById?: Maybe<Scalars['ID']>;
  splits?: Maybe<Array<SplitInput>>;
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
