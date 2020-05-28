> **IMPORTANT**: Under development, do not use it yet!

# ngx-urql

A GraphQL Library that wraps the blazing-fast [urql](https://formidable.com/open-source/urql/) library for Angular usage.

## Getting started

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
      // ...
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
    ```
    *WIP: The binding for `postsQuery` in `*gqlData` is only for Angular Template Type inference*
   
    ```html
   <ng-container [gqlQuery]="postsQuery">
     <div *gqlFetching>Loading...</div>
     <div *gqlData="postsQuery; let data">
       <a *ngFor="let p of data.posts" [routerLink]="p.id">{{p.title}}</a>
     </div>
     <div *gqlError="let error">{{error}}</div>
   </ng-container>
    ```
   
    c) Manipulate the result observable to consume it explicitly (i.e. here it would ignore the fetching state and possible errors)
    ```typescript
   @Component({
     // ...
   })
   export class PostsComponent {
     public posts = this.gql.query<PostsResponse>({
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
     <ng-container *ngIf="postResult.fetching">Loading...</ng-container>
     <!--  This allows for partial data, while also allowing for errors in the response-->
     <ng-container *ngIf="postResult.data as data">
       <a *ngFor="let p of data.posts" [routerLink]="p.id">{{p.title}}</a>
     </ng-container>
     <ng-container *ngIf="postResult.error">{{postResult.error}}</ng-container>
   </ng-container>
   ```

## Develop the library

1. Install the dependencies of the library
   
  ```bash
  (cd projects/ngx-urql && yarn)
  ```


1. Install the dependencies for the example app.
  
  ```bash
  yarn
  ```

1. Build the library itself and recompile on changes.
  ```bash
  ng build ngx-urql --watch
  ```

1. Link the local version of the library to the example app.
   ``bash
   (cd dist/ngx-urql && npm link)
   npm link ngx-urql
   ```

1. Run `ng serve` to start the example app. Navigate to `http://localhost:4200/`. 

The app and the library will automatically reload if you change any of the source files.