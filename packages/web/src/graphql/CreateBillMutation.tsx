// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';

import { CreateBillMutationArgs, Bill } from '../types';
import { BILL_META_FRAGMENT } from './fragments/billFragments';
import { MY_BILLS_QUERY } from './MyBillsQuery';

interface IRenderProps {
  loading: boolean;
  createBillMutation: MutationFn<Bill, CreateBillMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  name: string;
}

const CREATE_BILL_MUTATION = gql`
  mutation createBill($name: String!) {
    createBill(name: $name) {
      ...billMeta
    }
  }
  ${BILL_META_FRAGMENT}
`;

const CreateBillMutationContainer: React.FunctionComponent<IContainerProps> = ({
  children,
  name,
}) => (
  <Mutation<Bill, CreateBillMutationArgs>
    mutation={CREATE_BILL_MUTATION}
    variables={{ name }}
    refetchQueries={[
      {
        query: MY_BILLS_QUERY,
      },
    ]}
  >
    {(createBillMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        createBillMutation,
        loading: other.loading,
      });
    }}
  </Mutation>
);

export default CreateBillMutationContainer;
export { CREATE_BILL_MUTATION };
