import { gql } from '@apollo/client';

const FRAGMENT_BILL_USER_META = gql`
  fragment billUserMeta on BillUser {
    id
    firstName
    lastName
    email
    state
  }
`;

const FRAGMENT_BILL_INVITE_META = gql`
  fragment billInviteMeta on BillInvite {
    id
    state
  }
`;

export { FRAGMENT_BILL_USER_META, FRAGMENT_BILL_INVITE_META };
