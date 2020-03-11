import { firstLetter } from './string';

export function initials(user?: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}): string {
  if (!user) {
    return '..';
  }

  const { email, firstName, lastName } = user;
  return firstName
    ? firstLetter(firstName) + firstLetter(lastName)
    : firstLetter(email);
}
