import { NgModule, ModuleWithProviders } from '@angular/core';
import { ClientConfig, GRAPHQL_CLIENT_CONFIG } from './client-config';
import { GraphQLClient } from './graphql-client.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class NgxUrqlModule {
  public static forRoot(
    clientConfig: Partial<ClientConfig> = {},
  ): ModuleWithProviders<NgxUrqlModule> {
    return {
      ngModule: NgxUrqlModule,
      providers: [
        GraphQLClient,
        { provide: GRAPHQL_CLIENT_CONFIG, useValue: clientConfig },
      ],
    };
  }

  public static forChild(
    clientConfig: Partial<ClientConfig> = {},
  ): ModuleWithProviders<NgxUrqlModule> {
    return this.forRoot(clientConfig);
  }
 }
