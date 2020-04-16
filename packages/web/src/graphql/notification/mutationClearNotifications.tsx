import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { ClearType, MutationClearNotificationsArgs } from '../types';

export type MutationClearNotificationsResponse = {
  clearNotifications: boolean;
};

const MUTATION_CLEAR_NOTIFICATIONS = gql`
  mutation MutationClearNotifications($input: ClearNotificationsInput!) {
    clearNotifications(input: $input)
  }
`;

type Options = {
  type: ClearType;
  mutationOpts?: MutationHookOptions;
};

function useMutationClearNotifications({ type, mutationOpts }: Options) {
  const mutation = useMutation<
    MutationClearNotificationsResponse,
    MutationClearNotificationsArgs
  >(MUTATION_CLEAR_NOTIFICATIONS, {
    ...mutationOpts,
    variables: {
      input: {
        type,
      },
    },
  });

  return mutation;
}

export { MUTATION_CLEAR_NOTIFICATIONS, useMutationClearNotifications };
