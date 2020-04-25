import { UserState } from './config';

export type UserFilter = {
  id?: string;
  email?: string;
};

export type UserInput = {
  email: string;
  status?: keyof typeof UserState;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
};

export type SetupAccountInput = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

export interface SetupAccountArgs {
  input: SetupAccountInput;
}
