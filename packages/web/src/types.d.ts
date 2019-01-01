export type Maybe<T> = T | null;

export interface RegisterInput {
  email: string;

  password: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: Maybe<User>;
}

export interface User {
  id: string;

  email: string;

  displayName?: Maybe<string>;

  photoUrl?: Maybe<string>;
}

export interface Mutation {
  register: boolean;

  login: boolean;

  logout: boolean;
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
