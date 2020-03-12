// @flow
import { gql } from '@apollo/client';

const FRAGMENT_PG_PAGE_INFO = gql`
  fragment pageInfo on PageInfo {
    hasNextPage
    endCursor
    itemsCount
  }
`;

export { FRAGMENT_PG_PAGE_INFO };
