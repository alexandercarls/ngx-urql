import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GraphQLClient} from 'ngx-urql';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
  public postsQuery = this.gql.query<Post>({
    query: `
      query Posts {
        posts {
          id
          title
        }
      }
    `,
  });

  constructor(private gql: GraphQLClient) {
  }

}

type Post = {
  posts: Record<string, any>[];
};
