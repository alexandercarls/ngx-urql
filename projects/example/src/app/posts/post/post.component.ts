import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GraphQLClient} from "ngx-urql";
import {ActivatedRoute} from "@angular/router";
import {filter, map, shareReplay, switchMap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  postForm = this.fb.group({
    title: '',
  });

  postQuery = this.route.paramMap.pipe(
    map(pm => +pm.get('id')!),
    switchMap(id => this.gql.query<{ post: Record<string, any> }, { id: number }>({
      query: `query PostById($id: ID!) {
  post(id: $id) {
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
}`,
      variables: {id}
    })),
    shareReplay(1)
  )

  constructor(private route: ActivatedRoute,
              private gql: GraphQLClient,
              private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.postQuery.pipe(
      filter(r => !!r.data),
      map(r => r.data!.post)
    )
      .subscribe(post => {
        this.postForm.patchValue({
          title: post.title,
        });
      })
  }

  // TODO: Research why urql re-reruns all queries
  public handleSubmit(): void {
    this.gql.mutate<any, { id: number, input: { title: string } }>({
      query: `mutation SavePost($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    id
    title
  }
}`,
      variables: {
        id: +this.route.snapshot.paramMap.get('id')!,
        input: {title: this.postForm.value.title}
      }
    })
  }

}
