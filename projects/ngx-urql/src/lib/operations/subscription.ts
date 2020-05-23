import {Client, CombinedError, createRequest, OperationContext} from "@urql/core";
import {concat, fromValue, map, pipe, scan, toObservable} from "wonka";
import {DocumentNode} from "graphql";
import {initialState} from "./initial-state";
import {Observable} from "rxjs";
import {QueryResult} from "./query";

/*
 * Reference React: https://github.com/FormidableLabs/urql/blob/master/packages/react-urql/src/hooks/useSubscription.ts
 * Reference Svelte: https://github.com/FormidableLabs/urql/blob/master/packages/svelte-urql/src/operations/subscription.ts
 */

export function getSubscribe<T = any, R = T, V = object>(client: Client): (
  args: SubscriptionArguments<V>,
  handler?: SubscriptionHandler<T, R>
) => Observable<SubscriptionResult<T>> {
  return (args, handler) => {
    const request = createRequest(args.query, args.variables as any);

    const queryResult = pipe(
      concat([
        // Initially set fetching to true
        fromValue({fetching: true, stale: false}),
        pipe(
          client.executeSubscription(request, args.context),
          map(({stale, data, error, extensions}) => ({
            fetching: false, // TODO: React sets this to true: https://github.com/FormidableLabs/urql/blob/master/packages/react-urql/src/hooks/useSubscription.ts#L76
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
      scan((result, partial: any) => {
        const data = partial.data !== undefined
          ? typeof handler === 'function'
            ? handler(result.data, partial.data)
            : partial.data
          : result.data;
        return {...result, ...partial, data};
      }, initialState),
      toObservable
    );

    return new Observable<QueryResult<T>>(sub => queryResult.subscribe(sub));
  }
}

export interface SubscriptionArguments<V> {
  query: string | DocumentNode;
  variables?: V;
  context?: Partial<OperationContext>;
}

export type SubscriptionHandler<T, R> = (prev: R | undefined, data: T) => R;

export interface SubscriptionResult<T> {
  fetching: boolean;
  stale: boolean;
  data?: T;
  error?: CombinedError;
  extensions?: Record<string, any>;
}
