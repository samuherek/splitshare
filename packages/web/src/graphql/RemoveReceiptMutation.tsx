import { gql } from 'apollo-boost';

export const REMOVE_RECEIPT_MUTATION = gql`
  mutation removeReceipt($id: String!) {
    removeReceipt(id: $id)
  }
`;
