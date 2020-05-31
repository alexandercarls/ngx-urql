/* tslint:disable */
import * as Types from '../../types.generated';

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query, Mutation, Subscription } from 'ngx-urql';


export type PostsQueryVariables = {};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Post' }
    & Pick<Types.Post, 'id' | 'title'>
  )>>> }
);

export const PostsDocument = gql`
    query Posts {
  posts {
    id
    title
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class PostsGQL extends Query<PostsQuery, PostsQueryVariables> {
  document = PostsDocument;
}