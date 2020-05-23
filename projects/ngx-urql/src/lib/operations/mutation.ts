import {Client, OperationContext, OperationResult} from '@urql/core';
import {from, Observable} from 'rxjs';
import {DocumentNode} from 'graphql';

/*
 * Reference React: https://github.com/FormidableLabs/urql/blob/master/packages/react-urql/src/hooks/useMutation.ts
 * Reference Svelte: https://github.com/FormidableLabs/urql/blob/master/packages/svelte-urql/src/operations/mutate.ts
 */

export function getMutate<T, V = Record<string, any> | undefined>(client: Client): (
  args: MutationArguments<V>
) => Observable<OperationResult<T>> {
  return args => from(client.mutation(args.query, args.variables as any, args.context).toPromise());
}

export interface MutationArguments<V> {
  query: string | DocumentNode;
  variables?: V;
  context?: Partial<OperationContext>;
}

