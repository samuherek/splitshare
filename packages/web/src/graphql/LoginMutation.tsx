// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { User, LoginMutationArgs } from '../types';
import { ME_QUERY } from '../graphql/MeQuery';

// TODO: This doesn't use the generated types. We need to make sure of that.
interface IMutationData {
  [key: string]: any;
}

interface IMutationVariables {
  email: string;
  password: string;
}

interface IRenderProps {
  user?: User;
  loading: boolean;
  loginMutation: MutationFn<IMutationData, IMutationVariables>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => JSX.Element;
  variables: IMutationVariables;
}

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(password: $password, email: $email)
  }
`;

const LoginMutationContainer = ({ children, variables }: IContainerProps) => (
  <Mutation<IMutationData, LoginMutationArgs>
    mutation={LOGIN_MUTATION}
    variables={{ ...variables }}
    fetchPolicy="no-cache"
    refetchQueries={[{ query: ME_QUERY }]}
  >
    {(loginMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        loginMutation,
      });
    }}
  </Mutation>
);

export default LoginMutationContainer;
