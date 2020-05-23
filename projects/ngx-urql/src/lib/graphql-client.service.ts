import {Inject, Injectable} from '@angular/core';
import {Client, OperationResult} from '@urql/core';
import {ClientConfig, GRAPHQL_CLIENT_CONFIG} from './client-config';
import {Observable} from 'rxjs';
import {getQuery, QueryArguments, QueryResult} from './operations/query';
import {getMutate, MutationArguments} from './operations/mutation';
import {getSubscribe, SubscriptionArguments, SubscriptionHandler, SubscriptionResult} from './operations/subscription';

// TODO: Maybe split the different parts in their own service (query, mutation, subscription) to enable code splitting.

/** The URQL application-wide client library. Each execute method starts a GraphQL request and returns a stream of results. */
@Injectable()
export class GraphQLClient {
  private client = new Client(this.globalConfig);

  constructor(@Inject(GRAPHQL_CLIENT_CONFIG) private globalConfig: ClientConfig) {
  }

  public query<T, V = Record<string, any> | undefined>(args: QueryArguments<V>): Observable<QueryResult<T>> {
    return getQuery<T, V>(this.client)(args);
  }

  public mutate<T, V = Record<string, any> | undefined>(args: MutationArguments<V>): Observable<OperationResult<T>> {
    return getMutate<T, V>(this.client)(args);
  }

  /**
   * @UNTESTED
   */
  public subscribe<T = any, R = T, V = object>(
    args: SubscriptionArguments<V>,
    handler?: SubscriptionHandler<T, R>
  ): Observable<SubscriptionResult<T>> {
    return getSubscribe<T, R, V>(this.client)(args, handler);
  }
}



