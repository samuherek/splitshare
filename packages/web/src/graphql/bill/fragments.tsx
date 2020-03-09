import { gql } from 'apollo-boost';

const FRAGMENT_BILL_META = gql`
  fragment billMeta on Bill {
    id
    name
  }
`;

export { FRAGMENT_BILL_META };
