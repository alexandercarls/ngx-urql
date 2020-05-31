import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {QueryResult} from 'ngx-urql';
import {PostsGQL, PostsQuery} from './posts.component.generated';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  public postsQuery!: Observable<QueryResult<PostsQuery>>;

  constructor(private postsGQL: PostsGQL) {
  }

  public ngOnInit() {
    this.postsQuery = this.postsGQL.query({});
  }
}
