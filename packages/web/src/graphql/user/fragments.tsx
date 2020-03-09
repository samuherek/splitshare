import { gql } from 'apollo-boost';

const FRAGMENT_USER_META = gql`
  fragment userMeta on User {
    id
    email
    displayName
  }
`;

export { FRAGMENT_USER_META };
