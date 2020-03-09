// @flow
import { gql } from 'apollo-boost';

const FRAGMENT_PG_PAGE_INFO = gql`
  fragment pageInfo on PageInfo {
    hasNextPage
    endCursor
  }
`;

export { FRAGMENT_PG_PAGE_INFO };
