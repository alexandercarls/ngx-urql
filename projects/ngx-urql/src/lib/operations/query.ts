import {Observable} from 'rxjs';
import {concat, fromValue, map, pipe, scan, toObservable} from 'wonka';
import {Client, CombinedError, OperationContext, RequestPolicy} from '@urql/core';
import {DocumentNode} from 'graphql';
import {initialState} from './initial-state';

/*
 * Reference React: https://github.com/FormidableLabs/urql/blob/master/packages/react-urql/src/hooks/useQuery.ts
 * Reference Svelte: https://github.com/FormidableLabs/urql/blob/master/packages/svelte-urql/src/operations/query.ts
 */

export function getQuery<T, V = Record<string, any> | undefined>(client: Client): (args: QueryArguments<V>) => Observable<QueryResult<T>> {
  return args => {
    const queryResult = pipe(
      concat([
        // Initially set fetching to true
        fromValue({fetching: true, stale: false}),
        pipe(
          client.query<T>(
            args.query,
            args.variables,
            {
              requestPolicy: args.requestPolicy,
              pollInterval: args.pollInterval,
              ...args.context,
            }),
          map(({stale, data, error, extensions}) => ({
            fetching: false,
            stale: !!stale,
            data,
            error,
            extensions,
          }))
        ),
        // When the source proactively closes, fetching is set to false
        fromValue({fetching: false, stale: false}),
      ]),
      // The individual partial results are merged into each previous result
      scan((result, partial) => ({
        ...result,
        ...partial,
      }), initialState),
      toObservable,
    );

    return new Observable<QueryResult<T>>(sub => queryResult.subscribe(sub));
  };
}

export interface QueryArguments<V> {
  query: string | DocumentNode;
  variables?: V;
  requestPolicy?: RequestPolicy;
  pollInterval?: number;
  context?: Partial<OperationContext>;
}

export interface QueryResult<T> {
  fetching: boolean;
  stale: boolean;
  data?: T;
  error?: CombinedError;
  extensions?: Record<string, any>;
}
