// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql, ApolloClient } from 'apollo-boost';

// TODO: This doesn't use the generated types. We ned to fix that.
interface IRenderProps {
  loading: boolean;
  logout: MutationFn<boolean>;
  client: ApolloClient<object>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => JSX.Element;
}

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

// Apollo Flow Types
class LogoutMutation extends Mutation<boolean> {}

const LogoutContainer = ({ children }: IContainerProps) => (
  <LogoutMutation mutation={LOGOUT_MUTATION}>
    {(logout, other) => {
      // console.log(other);
      if (other.error) {
        console.log(other.error);
      }

      return children({
        client: other.client,
        loading: other.loading,
        logout,
      });
    }}
  </LogoutMutation>
);

export default LogoutContainer;
