// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { User, LoginMutationArgs } from 'src/types';
import { ME_QUERY } from 'src/containers/MeContainer';

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
  login: MutationFn<IMutationData, IMutationVariables>;
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

// Apollo Flow Types
class LoginMutation extends Mutation<IMutationData, LoginMutationArgs> {}

const LoginContainer = ({ children, variables }: IContainerProps) => (
  <LoginMutation
    mutation={LOGIN_MUTATION}
    variables={{ ...variables }}
    refetchQueries={[{ query: ME_QUERY }]}
  >
    {(login, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        login,
      });
    }}
  </LoginMutation>
);

export default LoginContainer;
