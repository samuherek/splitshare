import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { User } from '../types';
import { FRAGMENT_USER_META } from './fragments';

type QueryMeData = {
  me?: User;
};

const QUERY_ME = gql`
  query queryMe {
    me {
      ...userMeta
    }
  }
  ${FRAGMENT_USER_META}
`;

function useQueryMe() {
  const query = useQuery<QueryMeData>(QUERY_ME);

  return query;
}

export { QUERY_ME, useQueryMe };
