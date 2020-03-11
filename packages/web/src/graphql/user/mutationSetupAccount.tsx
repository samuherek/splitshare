import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { MutationSetupAccountArgs, User } from '../types';
import { QUERY_ME } from './queryMe';

export type MutationSetupAccountResponse = {
  setupAccount: User;
};

const MUTATION_SETUP_ACCOUNT = gql`
  mutation mutationSetupAccount($input: SetupInput!) {
    setupAccount(input: $input)
  }
`;

type Options = {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
};

function useMutationSetupAccount({
  firstName,
  lastName,
  avatarUrl = null,
}: Options) {
  const mutation = useMutation<
    MutationSetupAccountResponse,
    MutationSetupAccountArgs
  >(MUTATION_SETUP_ACCOUNT, {
    variables: {
      input: {
        firstName,
        lastName,
        avatarUrl,
      },
    },
    refetchQueries: [
      {
        query: QUERY_ME,
      },
    ],
  });

  return mutation;
}

export { MUTATION_SETUP_ACCOUNT, useMutationSetupAccount };
