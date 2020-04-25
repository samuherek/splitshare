import { gql } from '@apollo/client';

const FRAGMENT_BILL_META = gql`
  fragment billMeta on Bill {
    name
    currency
    updatedAt
    closedAt
  }
`;

export { FRAGMENT_BILL_META };
