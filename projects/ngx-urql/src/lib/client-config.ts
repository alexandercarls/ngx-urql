import { InjectionToken } from '@angular/core';

export const GRAPHQL_CLIENT_CONFIG = new InjectionToken<ClientConfig>(
  'Default GraphQL client options',
);

/**
 * Describes all available options that may be passed to the `GraphQLClient`.
 */
export class ClientConfig {

 /** Target endpoint URL such as `https://my-target:8080/graphql`. */
  public url: string;

  constructor(url: string, config: Partial<ClientConfig>) {
      this.url = url;
      Object.assign(this, config);
  }
}