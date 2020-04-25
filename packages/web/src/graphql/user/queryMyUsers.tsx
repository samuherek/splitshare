import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { User } from '../types';
import { FRAGMENT_USER_META, FRAGMENT_USER_STATE } from './fragments';

type QueryMyUsersResponse = {
  myUsers: User[];
};

const QUERY_MY_USERS = gql`
  query queryMyUsers {
    myUsers {
      ...userMeta
      ...userState
    }
  }
  ${FRAGMENT_USER_META}
  ${FRAGMENT_USER_STATE}
`;

type Options = {
  queryOpts?: QueryHookOptions;
};

function useQueryMyUsers({ queryOpts }: Options = {}) {
  const query = useQuery<QueryMyUsersResponse>(QUERY_MY_USERS, queryOpts);

  return query;
}

export { QUERY_MY_USERS, useQueryMyUsers };
