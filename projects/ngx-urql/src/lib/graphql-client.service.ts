import { Injectable, Inject } from '@angular/core';
import {Client, RequestPolicy, OperationContext, CombinedError, OperationResult} from '@urql/core';
import { pipe, fromValue, concat, scan, map, toObservable } from 'wonka';
import { DocumentNode } from 'graphql';
import { GRAPHQL_CLIENT_CONFIG, ClientConfig } from './client-config';
import {from, Observable} from 'rxjs';



// TODO: Maybe split the differen parts in their own service (query, mutation, subscription) to enable code splitting.

@Injectable()
export class GraphQLClient {
  private client = new Client(this.globalConfig);

  constructor(@Inject(GRAPHQL_CLIENT_CONFIG) private globalConfig: ClientConfig) {
  }

  /*
   * Reference React: https://github.com/FormidableLabs/urql/blob/master/packages/react-urql/src/hooks/useQuery.ts
   * Reference Svelte: https://github.com/FormidableLabs/urql/blob/master/packages/svelte-urql/src/operations/query.ts
   */
  public query<T, V = Record<string, any> | undefined>(args: QueryArguments<V>): Observable<QueryResult<T>> {

    const queryResult = pipe(
      concat([
        // Initially set fetching to true
        fromValue({ fetching: true, stale: false }),
        pipe(
          this.client.query<T>(
            args.query,
            args.variables,
            {
              requestPolicy: args.requestPolicy,
              pollInterval: args.pollInterval,
              ...args.context,
            }),
          map(({ stale, data, error, extensions }) => ({
            fetching: false,
            stale: !!stale,
            data,
            error,
            extensions,
          }))
        ),
        // When the source proactively closes, fetching is set to false
        fromValue({ fetching: false, stale: false }),
      ]),
      // The individual partial results are merged into each previous result
      scan(
        (result, partial) => ({
          ...result,
          ...partial,
        }),
        initialState
      ),
      toObservable,
    );

    return new Observable<QueryResult<T>>(sub => queryResult.subscribe(sub));
  }

  /*
   * Reference React: https://github.com/FormidableLabs/urql/blob/master/packages/react-urql/src/hooks/useMutation.ts
   * Reference Svelte: https://github.com/FormidableLabs/urql/blob/master/packages/svelte-urql/src/operations/mutate.ts
   */
  public mutate<T, V = Record<string, any> | undefined>(args: MutationArguments<V>): Observable<OperationResult<T>> {
    return from(this.client.mutation(args.query, args.variables as any, args.context).toPromise())
  }
}


export interface QueryArguments<V> {
  query: string | DocumentNode;
  variables: V;
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

export interface MutationArguments<V> {
  query: string | DocumentNode;
  variables?: V;
  context?: Partial<OperationContext>;
}

export const initialState = {
  fetching: false,
  stale: false,
  error: undefined,
  data: undefined,
  extensions: undefined,
};
