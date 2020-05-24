import {ModuleWithProviders, NgModule} from '@angular/core';
import {ClientConfig, GRAPHQL_CLIENT_CONFIG} from './client-config';
import {GraphQLClient} from './graphql-client.service';
import {QueryDirective} from './query-directive/query.directive';
import {DataDirective} from './query-directive/data.directive';
import {FetchingDirective} from './query-directive/fetching.directive';
import {ErrorDirective} from './query-directive/error.directive';

@NgModule({
  declarations: [QueryDirective, DataDirective, FetchingDirective, ErrorDirective],
  imports: [],
  exports: [
    QueryDirective,
    FetchingDirective,
    DataDirective,
    ErrorDirective,
  ],
})
export class NgxUrqlModule {
  /**
   * @param url - Endpoint URL such as `https://my-target:8080/graphql`.
   * @param clientConfig - Options for configuring the URQL [client]{@link GraphQLClient}.
   */
  public static forRoot(
    url: string,
    clientConfig: PartialClientConfig = {},
  ): ModuleWithProviders<NgxUrqlModule> {
    return {
      ngModule: NgxUrqlModule,
      providers: [
        GraphQLClient,
        {provide: GRAPHQL_CLIENT_CONFIG, useValue: new ClientConfig(url, clientConfig)},
      ],
    };
  }

  /**
   * @param url - Endpoint URL such as `https://my-target:8080/graphql`.
   * @param clientConfig - Options for configuring the URQL [client]{@link GraphQLClient}.
   */
  public static forChild(
    url: string,
    clientConfig: PartialClientConfig = {},
  ): ModuleWithProviders<NgxUrqlModule> {
    return this.forRoot(url, clientConfig);
  }
}

export type PartialClientConfig = Omit<ClientConfig, 'url'>;
