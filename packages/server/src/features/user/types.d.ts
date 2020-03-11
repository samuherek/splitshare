import { userState } from './config';

export type UserFilter = {
  email: string;
};

export type UserInput = {
  email: string;
  status?: keyof typeof userState;
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
