// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { User, UpdateMeMutationArgs, MeInput } from 'src/types';

// TODO: This doesn't use the generated types. We need to make sure of that.
interface IMutationData {
  user: User;
}

interface IRenderProps {
  user?: User;
  loading: boolean;
  updateMeMutation: MutationFn<IMutationData, UpdateMeMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => JSX.Element;
  meInput: MeInput;
}

export const UPDATE_ME_MUTATION = gql`
  mutation updateMe($meInput: MeInput!) {
    updateMe(meInput: $meInput) {
      displayName
      email
      id
    }
  }
`;

const UpdateMeContainer = ({ children, meInput }: IContainerProps) => (
  <Mutation<IMutationData, UpdateMeMutationArgs>
    mutation={UPDATE_ME_MUTATION}
    variables={{ meInput }}
  >
    {(updateMeMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        updateMeMutation,
      });
    }}
  </Mutation>
);

export default UpdateMeContainer;
