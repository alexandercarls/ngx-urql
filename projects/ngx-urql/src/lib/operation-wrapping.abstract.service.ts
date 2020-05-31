import {GraphQLClient} from './graphql-client.service';
import {Injectable} from '@angular/core';
import {QueryArguments} from './operations/query';
import {MutationArguments} from './operations/mutation';
import {DocumentNode} from 'graphql';
import {SubscriptionArguments, SubscriptionHandler} from './operations/subscription';

export type WithoutQuery<T> = Omit<T, 'query'>;

@Injectable()
export abstract class Query<T, V = void> {
  protected constructor(private client: GraphQLClient) {

  }

  protected abstract readonly document: DocumentNode;

  public query(args: WithoutQuery<QueryArguments<V>>) {
    return this.client.query<T, V>({
      ...args,
      query: this.document
    });
  }
}

@Injectable()
export abstract class Mutation<T, V = void> {
  protected constructor(private client: GraphQLClient) {

  }

  protected abstract readonly document: DocumentNode;

  public mutate(args: WithoutQuery<MutationArguments<V>>) {
    return this.client.mutate<T, V>({
      ...args,
      query: this.document
    });
  }
}

@Injectable()
export abstract class Subscription<T, V = void> {
  protected constructor(private client: GraphQLClient) {

  }

  protected abstract readonly document: DocumentNode;

  public subscribe(args: WithoutQuery<SubscriptionArguments<V>>, handler?: SubscriptionHandler<T, Partial<T>>) {
    return this.client.subscribe<T, Partial<T>, V>({
      ...args,
      query: this.document
    }, handler);
  }
}
