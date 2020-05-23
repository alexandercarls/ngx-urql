import {InjectionToken} from '@angular/core';
import {RequestPolicy} from '@urql/core/dist/types/types';

export const GRAPHQL_CLIENT_CONFIG = new InjectionToken<ClientConfig>('Default GraphQL client options');

/**
 * Describes all available options that are passed to the `GraphQLClient`.
 */
export class ClientConfig {

  /** Target endpoint URL such as `https://my-target:8080/graphql`. */
  public url: string;

  /** Any additional options to pass to fetch. */
  // fetchOptions?: RequestInit | (() => RequestInit);

  /** An alternative fetch implementation. */
  // fetch?: typeof fetch;

  /** An ordered array of Exchanges. */
  // public exchanges?: Exchange[];

  /** Activates support for Suspense. */
  // suspense?: boolean;
  /** The default request policy for requests. */
  public requestPolicy?: RequestPolicy;

  /** Use HTTP GET for queries. */

  // preferGetMethod?: boolean;

  /** Mask __typename from results. */
  // maskTypename?: boolean;

  constructor(url: string, config: Partial<ClientConfig>) {
    this.url = url;
    Object.assign(this, config);
  }
}
