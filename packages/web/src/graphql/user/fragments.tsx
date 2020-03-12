import { gql } from '@apollo/client';

const FRAGMENT_USER_META = gql`
  fragment userMeta on User {
    id
    email
    firstName
    lastName
    avatarUrl
  }
`;

const FRAGMENT_USER_STATE = gql`
  fragment userState on User {
    state
  }
`;

export { FRAGMENT_USER_META, FRAGMENT_USER_STATE };
