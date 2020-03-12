// @flow
import { gql } from '@apollo/client';

const FRAGMENT_PG_PAGE_INFO = gql`
  fragment pageInfo on PageInfo {
    hasNextPage
    endCursor
  }
`;

export { FRAGMENT_PG_PAGE_INFO };
