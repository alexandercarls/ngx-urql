import { RawClientSideBasePluginConfig } from '@graphql-codegen/visitor-plugin-common';

/**
 * @description This plugin generates urql services (`Query`, `Mutation` and `Subscription`) with TypeScript typings.
 *
 */
export interface UrqlAngularRawPluginConfig extends RawClientSideBasePluginConfig {
  /**
   * @description Allows to define a custom suffix for query operations.
   */
  querySuffix?: string;
  /**
   * @description Allows to define a custom suffix for mutation operations.
   */
  mutationSuffix?: string;
  /**
   * @description Allows to define a custom suffix for Subscription operations.
   */
  subscriptionSuffix?: string;
}
