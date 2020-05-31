/*
 * Public API Surface of ngx-urql
 */

export * from './lib/query-directive/query.directive';
export * from './lib/query-directive/fetching.directive';
export * from './lib/query-directive/data.directive';
export * from './lib/query-directive/error.directive';
export {QueryArguments, QueryResult} from './lib/operations/query';
export {MutationArguments} from './lib/operations/mutation';
export {SubscriptionArguments, SubscriptionHandler, SubscriptionResult} from './lib/operations/subscription';
export * from './lib/graphql-client.service';
export * from './lib/operation-wrapping.abstract.service';
export * from './lib/ngx-urql.module';
