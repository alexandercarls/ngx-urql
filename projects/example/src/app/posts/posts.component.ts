import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GraphQLClient} from 'ngx-urql';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
  public postsQuery = this.gql.query<PostsResponse>({
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

interface PostsResponse {
  posts: Post[];
}

interface Post {
  id: string;
  title: string
}
