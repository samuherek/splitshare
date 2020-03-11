import { gql } from 'apollo-boost';

const FRAGMENT_BILL_USER_META = gql`
  fragment billUserMeta on BillUser {
    id
    firstName
    lastName
    email
    state
  }
`;

export { FRAGMENT_BILL_USER_META };
