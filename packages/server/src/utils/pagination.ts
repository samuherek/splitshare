import { SelectQueryBuilder } from 'typeorm';
import { PaginationArgs, PaginationConnection } from '../types';

function encodeCursor(str: string) {
  return Buffer.from(str).toString('base64');
}

function decodeCursor(str: string) {
  return Buffer.from(str, 'base64').toString('ascii');
}

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  info: PaginationArgs = {}
): Promise<PaginationConnection<T>> {
  const { limit = 10, after = undefined } = info;

  if (limit) {
    query.limit(limit);
  }

  const [results, count] = await query.getManyAndCount();
  // console.log(results, count);

  return {
    edges: results.map(r => ({ node: r, cursor: 'nodeCursor' })),
    pageInfo: {
      hasNextPage: false,
      endCursor: 'cursorEnd',
      itemsCount: count,
    },
  };
}
