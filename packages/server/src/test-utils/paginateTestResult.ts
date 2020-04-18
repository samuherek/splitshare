import { PaginationConnection } from '../types';

export default function paginateTestResult(
  resArray: any[]
): PaginationConnection<any> {
  return {
    edges: resArray.map((r) => ({ node: r, cursor: 'nodeCursor' })),
    pageInfo: {
      hasNextPage: false,
      endCursor: 'endCursor',
      itemsCount: 0,
    },
  };
}
