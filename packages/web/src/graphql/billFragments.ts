// @flow
import { gql } from 'apollo-boost';

const BILL_META_FRAGMENT = gql`
  fragment billMeta on Bill {
    id
    name
    createdAt
  }
`;

export { BILL_META_FRAGMENT };
