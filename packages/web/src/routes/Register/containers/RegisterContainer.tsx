// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { ME_QUERY } from 'src/containers/MeContainer';
import { RegisterMutationArgs } from 'src/types';

// TODO: This doesn't use the generated types. We need to make sure of that.
interface IMutationData {
  [key: string]: any;
}

interface IRenderProps {
  loading: boolean;
  register: MutationFn<IMutationData, RegisterMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => JSX.Element;
  email: string;
  password: string;
}

export const REGISTER_MUTATION = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;

// Apollo Flow Types
class RegisterMutation extends Mutation<IMutationData, RegisterMutationArgs> {}

const RegisterContainer = ({ children, email, password }: IContainerProps) => (
  <RegisterMutation
    mutation={REGISTER_MUTATION}
    variables={{ email, password }}
    fetchPolicy="no-cache"
    refetchQueries={[{ query: ME_QUERY }]}
  >
    {(register, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        register,
      });
    }}
  </RegisterMutation>
);

export default RegisterContainer;
