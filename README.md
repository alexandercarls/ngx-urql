> **IMPORTANT**: Under development, do not use it yet!
>
> https://hackmd.io/@Nm-4RAuGTTSIuC03vWpwFQ/S10cz-OiI

# ngx-urql

A GraphQL Library that wraps the blazing-fast [urql](https://formidable.com/open-source/urql/) library for Angular usage.

# Getting started

1. Install the libraries:

```bash
yarn add ngx-urql graphql
```

2. Register the `NgxUrqlModule`

```javascript
NgxUrqlModule.forRoot('https://fakeql.com/graphql/439b33402a495423dbaa6c467a59bcc0'),
```

3. Inject the `GraphQLClient` in the component

    a) Consume the result observable declaratively.
    ```typescript
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
    ```
   
    ```html
   <ng-container [gqlQuery]="postsQuery" class="posts" >
     <div *gqlFetching>Loading</div>
     <div *gqlData="postsQuery; let data" class="posts">
       <a *ngFor="let p of data.posts" [routerLink]="p.id" routerLinkActive="active">{{p.title}}</a>
     </div>
     <div *gqlError="let error">{{error}}</div>
   </ng-container>
    ```
   
    c) Manipulate the result observable to consume it explicitly (i.e. here it would ignore the fetching state and possible errors)
    ```typescript
   @Component({
     selector: 'app-posts',
     templateUrl: './posts.component.html',
     styleUrls: ['./posts.component.scss'],
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   export class PostsComponent {
     public posts = this.gql.query<Post>({
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
   ```
   
   c) Handle everything explicitly
   
   ```html
   <ng-container *ngIf="postQuery | async as postResult">
     <ng-container *ngIf="postResult.fetching">Loading</ng-container>
     <ng-container *ngIf="postResult.error">Error {{postResult.error}}</ng-container>
   
     <!--  This allows for partial data, while also allowing for errors in the response-->
     <ng-container *ngIf="postResult.data as post">
       <form [formGroup]="postForm" (ngSubmit)="handleSubmit()">
         <input formControlName="title">
         <button>Save</button>
       </form>
   
       <pre>{{post | json}}</pre>
     </ng-container>
   
   </ng-container>
   ```


## Develop the library

1. Run `ng build ngx-urql --watch` to build the library itself.
1. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

The app and the library will automatically reload if you change any of the source files.

