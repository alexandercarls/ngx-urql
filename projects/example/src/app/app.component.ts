import {Component} from '@angular/core';
import {GraphQLClient} from 'ngx-urql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public pickachu = this.graphql.query<any, {id: number}>({
    query: `query UserById($id: ID!) {
  user(id: $id) {
    id
    firstname
    age
  }
}`,
    variables: {
      id: 1
    }
  });

  constructor(private graphql: GraphQLClient) {
  }
}
