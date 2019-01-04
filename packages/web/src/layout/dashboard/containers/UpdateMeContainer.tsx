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
  updateMe: MutationFn<IMutationData, UpdateMeMutationArgs>;
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

// Apollo Flow Types
class UpdateMeMutation extends Mutation<IMutationData, UpdateMeMutationArgs> {}

const UpdateMeContainer = ({ children, meInput }: IContainerProps) => (
  <UpdateMeMutation mutation={UPDATE_ME_MUTATION} variables={{ meInput }}>
    {(updateMe, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        updateMe,
      });
    }}
  </UpdateMeMutation>
);

export default UpdateMeContainer;
