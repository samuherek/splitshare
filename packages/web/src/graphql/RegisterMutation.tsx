// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { ME_QUERY } from '../graphql/MeQuery';
import { RegisterMutationArgs } from 'src/types';

// TODO: This doesn't use the generated types. We need to make sure of that.
interface IMutationData {
  [key: string]: any;
}

interface IRenderProps {
  loading: boolean;
  registerMutation: MutationFn<IMutationData, RegisterMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => JSX.Element;
  email: string;
  password: string;
}

export const REGISTER_MUTATION = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

const RegisterMutationContainer = ({
  children,
  email,
  password,
}: IContainerProps) => (
  <Mutation<IMutationData, RegisterMutationArgs>
    mutation={REGISTER_MUTATION}
    variables={{ email, password }}
    fetchPolicy="no-cache"
    refetchQueries={[{ query: ME_QUERY }]}
  >
    {(registerMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        registerMutation,
      });
    }}
  </Mutation>
);

export default RegisterMutationContainer;
