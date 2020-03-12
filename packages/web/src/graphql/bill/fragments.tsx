import { gql } from '@apollo/client';

const FRAGMENT_BILL_META = gql`
  fragment billMeta on Bill {
    id
    name
    currency
  }
`;

export { FRAGMENT_BILL_META };
