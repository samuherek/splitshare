import { User } from '../graphql/types';
import { firstLetter } from './string';

export function initials(user?: User): string {
  if (!user) {
    return '..';
  }

  const { email, firstName, lastName } = user;
  return firstName
    ? firstLetter(firstName) + firstLetter(lastName)
    : firstLetter(email);
}
