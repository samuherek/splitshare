import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { FRAGMENT_PG_PAGE_INFO } from '../fragments';
import { NotificationConnection, QueryNotificationsArgs } from '../types';

export type QueryNotificationsResponse = {
  notifications: NotificationConnection;
};

const QUERY_NOTIFICATIONS = gql`
  query QueryNotifications($pagination: PaginationInput) {
    notifications(pagination: $pagination) {
      edges {
        node {
          id
          createdAt
          isRead
          action
          entityType
          actor {
            id
            email
          }
          entity {
            ... on BillInvite {
              id
              state
              bill {
                id
                name
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
  ${FRAGMENT_PG_PAGE_INFO}
`;

type Options = {
  queryOpts?: QueryHookOptions;
};

function useQueryNotifications({ queryOpts }: Options = {}) {
  const query = useQuery<QueryNotificationsResponse, QueryNotificationsArgs>(
    QUERY_NOTIFICATIONS,
    {
      ...queryOpts,
      variables: {},
    }
  );

  return query;
}

export { QUERY_NOTIFICATIONS, useQueryNotifications };
