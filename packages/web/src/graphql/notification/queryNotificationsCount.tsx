import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { QueryNotificationsCountArgs } from '../types';

export type QueryNotificationsCountResponse = {
  notificationsCount: number;
};

const QUERY_NOTIFICATIONS_COUNT = gql`
  query QueryNotificationsCount($filter: NotificationsFilter) {
    notificationsCount(filter: $filter)
  }
`;

type Options = {
  isSeen?: boolean;
  isRead?: boolean;
  queryOpts?: QueryHookOptions;
};

function useQueryNotificationsCount({
  isSeen,
  isRead,
  queryOpts,
}: Options = {}) {
  const query = useQuery<
    QueryNotificationsCountResponse,
    QueryNotificationsCountArgs
  >(QUERY_NOTIFICATIONS_COUNT, {
    ...queryOpts,
    variables: {
      filter: {
        isSeen,
        isRead,
      },
    },
  });

  return query;
}

export { QUERY_NOTIFICATIONS_COUNT, useQueryNotificationsCount };
