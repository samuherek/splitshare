import { QueryResult } from '@apollo/client';

export type MergedQueryState = {
  loading: boolean;
  error: Error | { message: string } | null;
};

export function mergeQueryState(...queries: QueryResult[]): MergedQueryState {
  let loading = false;
  let error = null;

  queries.forEach(q => {
    if (q.loading) {
      loading = q.loading;
    }
    if (q.error) {
      error = q.error;
    }
  });
  return {
    loading,
    error,
  };
}
