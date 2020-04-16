import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { MutationUpdateNotificationArgs, Notification } from '../types';

export type MutationUpdateNotificationResponse = {
  updateNotification: Notification;
};

const MUTATION_UPDATE_NOTIFICATION = gql`
  mutation MutationUpdateNotification(
    $id: ID!
    $input: UpdateNotificationInput!
  ) {
    updateNotification(id: $id, input: $input) {
      id
      isSeen
      isRead
    }
  }
`;

type Options = {
  notificationId: string;
  isSeen?: boolean;
  isRead?: boolean;
  mutationOpts?: MutationHookOptions;
};

function useMutationUpdateNotification({
  notificationId,
  isSeen,
  isRead,
  mutationOpts,
}: Options) {
  const mutation = useMutation<
    MutationUpdateNotificationResponse,
    MutationUpdateNotificationArgs
  >(MUTATION_UPDATE_NOTIFICATION, {
    ...mutationOpts,
    variables: {
      id: notificationId,
      input: {
        isRead,
        isSeen,
      },
    },
  });

  return mutation;
}

export { MUTATION_UPDATE_NOTIFICATION, useMutationUpdateNotification };
