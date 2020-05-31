import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {QueryResult} from 'ngx-urql';
import {ActivatedRoute} from '@angular/router';
import {filter, map, shareReplay, switchMap} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {PostByIdGQL, PostByIdQuery, PostFragment, SavePostGQL} from './post.component.generated';
import {Observable} from 'rxjs';

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

  public postQuery!: Observable<QueryResult<PostByIdQuery>>;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private postByIdGQL: PostByIdGQL,
              private savePostGQL: SavePostGQL
  ) {
  }

  public ngOnInit(): void {
    this.postQuery = this.route.paramMap.pipe(
      map(pm => pm.get('id')!),
      switchMap(id => this.postByIdGQL.query({variables: {id}})),
      shareReplay(1)
    );

    this.postQuery.pipe(
      map(r => r.data?.post),
      filter((post): post is PostFragment => !!post),
    )
      .subscribe(post => {
        this.postForm.patchValue({
          title: post.title,
        });
      });
  }

  // TODO: Research why urql re-reruns all queries
  public handleSubmit(): void {
    this.savePostGQL.mutate({variables: {
      id: this.route.snapshot.paramMap.get('id')!,
      input: {title: this.postForm.value.title}
    }});
  }

}
