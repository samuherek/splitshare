// @flow
import { gql } from 'apollo-boost';

const RECEIPT_META_FRAGMENT = gql`
  fragment receiptMeta on Receipt {
    id
    total
    currency
  }
`;

const RECEIPT_DETAILS_FRAGMENT = gql`
  fragment receiptDetails on Receipt {
    comment
    category
    company
    country
  }
`;

const RECEIPT_TIME_FRAGMENT = gql`
  fragment receiptTime on Receipt {
    createdAt
    updatedAt
  }
`;

export {
  RECEIPT_DETAILS_FRAGMENT,
  RECEIPT_META_FRAGMENT,
  RECEIPT_TIME_FRAGMENT,
};
