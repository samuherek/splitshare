import capitalize from 'capitalize';
import { User } from '../graphql/types';
import { firstLetter } from './string';

export function initials(
  user?: Pick<User, 'email' | 'firstName' | 'lastName'>
): string {
  if (!user) {
    return '..';
  }

  const { email, firstName, lastName } = user;
  return firstName
    ? firstLetter(firstName) + firstLetter(lastName)
    : firstLetter(email);
}

export function getDisplayName(
  user?: Pick<User, 'email' | 'firstName' | 'lastName'>
) {
  if (!user) {
    return '..';
  }

  const { email, firstName, lastName } = user;
  const first = firstName ? capitalize(firstName) : null;
  const last = lastName ? capitalize(lastName) : null;

  return first ? `${first} ${last}` : email;
}
