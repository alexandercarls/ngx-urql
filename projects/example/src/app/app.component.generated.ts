/* tslint:disable */
import * as Types from '../types.generated';

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query, Mutation, Subscription } from 'ngx-urql';


export type UserByIdQueryVariables = {
  id: Types.Scalars['ID'];
};


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { user?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'firstname' | 'age'>
  )> }
);

export const UserByIdDocument = gql`
    query UserById($id: ID!) {
  user(id: $id) {
    id
    firstname
    age
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class UserByIdGQL extends Query<UserByIdQuery, UserByIdQueryVariables> {
  document = UserByIdDocument;
}