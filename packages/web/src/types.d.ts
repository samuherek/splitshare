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

  creatorId: string;

  createdAt: DateTime;

  updatedAt: DateTime;

  users: User[];
}

export interface Mutation {
  register: boolean;

  login: boolean;

  logout: boolean;

  updateMe: User;

  createBill: Bill;
}

// ====================================================
// Arguments
// ====================================================

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
