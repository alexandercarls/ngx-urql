> **IMPORTANT**: Under development, do not use it yet!


# ngx-urql

A GraphQL Library that wraps the blazing-fast [urql](https://formidable.com/open-source/urql/) library for Angular usage.

## [Library documentation](./projects/ngx-urql/README.md)

## Develop the library

1. Install the dependencies of the library
   
  ```bash
  (cd projects/ngx-urql && yarn)
  ```
1. Install the dependencies of the codegen
   
  ```bash
  (cd projects/ngx-urql-codegen-plugin && yarn)
  ```


1. Install the dependencies for the example app.
  
  ```bash
  yarn
  ```

1. Build the library itself and recompile on changes.
  ```bash
  ng build ngx-urql --watch
  ```

1. Build the codegen itself.
  ```bash
  (cd projects/ngx-urql-codegen-plugin && yarn build)
  ```

1. Link the local version of the library to the example app.
   ```bash
   (cd dist/ngx-urql && npm link)
   npm link ngx-urql
   (cd projects/ngx-urql-codegen-plugin && npm link)
   npm link ngx-urql-codegen-plugin
   ```

1. Run `ng serve` to start the example app. Navigate to `http://localhost:4200/`. 

The app and the library will automatically reload if you change any of the source files.
