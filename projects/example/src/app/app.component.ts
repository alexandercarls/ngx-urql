import {Component, OnInit} from '@angular/core';
import {UserByIdGQL, UserByIdQuery} from './app.component.generated';
import {Observable} from 'rxjs';
import {QueryResult} from 'ngx-urql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public pickachu!: Observable<QueryResult<UserByIdQuery>>;

  constructor(private userByIdGQL: UserByIdGQL) {
  }

  public ngOnInit() {
    this.pickachu = this.userByIdGQL.query({variables: {id: '1'}});
  }
}
