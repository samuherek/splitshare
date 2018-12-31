// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { User } from 'src/types';

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
    login(password: $password, email: $email) {
      user {
        id
        email
        displayName
        photoUrl
      }
      sessionId
    }
  }
`;

// Apollo Flow Types
class LoginMutation extends Mutation<IMutationData, IMutationVariables> {}

const LoginContainer = ({ children, variables }: IContainerProps) => (
  <LoginMutation mutation={LOGIN_MUTATION} variables={{ ...variables }}>
    {(login, other) => {
      console.log(other);
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        login,
        user: other.data ? other.data.login.user : undefined,
      });
    }}
  </LoginMutation>
);

export default LoginContainer;
