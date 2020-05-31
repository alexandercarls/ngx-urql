/* tslint:disable */
import * as Types from '../../../types.generated';

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query, Mutation, Subscription } from 'ngx-urql';


export type PostFragment = (
  { __typename?: 'Post' }
  & Pick<Types.Post, 'id' | 'date' | 'title'>
  & { user: (
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'firstname'>
  ), comments?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Comment' }
    & Pick<Types.Comment, 'id' | 'text'>
  )>>> }
);

export type PostByIdQueryVariables = {
  id: Types.Scalars['ID'];
};


export type PostByIdQuery = (
  { __typename?: 'Query' }
  & { post?: Types.Maybe<(
    { __typename?: 'Post' }
    & PostFragment
  )> }
);

export type SavePostMutationVariables = {
  id: Types.Scalars['ID'];
  input: Types.UpdatePostInput;
};


export type SavePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & PostFragment
  ) }
);

export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  date
  title
  user {
    id
    firstname
  }
  comments {
    id
    text
  }
}
    `;
export const PostByIdDocument = gql`
    query PostById($id: ID!) {
  post(id: $id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

@Injectable({
  providedIn: 'root'
})
export class PostByIdGQL extends Query<PostByIdQuery, PostByIdQueryVariables> {
  document = PostByIdDocument;
}
export const SavePostDocument = gql`
    mutation SavePost($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

@Injectable({
  providedIn: 'root'
})
export class SavePostGQL extends Mutation<SavePostMutation, SavePostMutationVariables> {
  document = SavePostDocument;
}