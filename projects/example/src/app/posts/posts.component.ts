import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {GraphQLClient} from 'ngx-urql';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

  public posts = this.gql.query<any>({
    query: `
      query Posts {
        posts {
          id
          title
        }
      }
    `,
  }).pipe(
    map(r => r.data?.posts ?? [])
  );

  constructor(private gql: GraphQLClient) {
  }

}
