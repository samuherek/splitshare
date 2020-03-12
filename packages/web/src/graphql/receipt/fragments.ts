import { gql } from '@apollo/client';

const FRAGMENT_RECEIPT_META = gql`
  fragment receiptMeta on Receipt {
    id
    title
  }
`;

export { FRAGMENT_RECEIPT_META };
