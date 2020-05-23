import {AfterContentInit, ContentChild, Directive, Input} from '@angular/core';
import {QueryResult} from "../operations/query";
import {DataDirective} from "./data.directive";
import {FetchingDirective} from "./fetching.directive";
import {ErrorDirective} from "./error.directive";

// TODO: The directive allow for partial results per default (i.e. displaying the error **and** data.
//   Do we need to add an option to disable that behaviour?

@Directive({
  selector: '[gqlQuery]',
})
export class QueryDirective<T> implements AfterContentInit {
  @ContentChild(DataDirective) dataDirective: DataDirective | null = null;
  @ContentChild(FetchingDirective) fetchDirective: FetchingDirective | null = null;
  @ContentChild(ErrorDirective) errorDirective: ErrorDirective | null = null;

  @Input('gqlQuery')
  public set query(value: QueryResult<T> | null) {
    if (value === null) {
      return;
    }

    console.log('[QueryDirective]: Input changed - ', value);

    this.fetchDirective?.showContent(value.fetching)

    // We need to force remove the content if the query has no data (i.e. is fetching or has an error)
    // In the future the might be a UX patter where we can display the previous fetched content
    // while a new request is fetching.
    this.dataDirective?.showContent(value?.data);
    this.errorDirective?.showContent(value?.error);
  }

  ngAfterContentInit(): void {
    // TODO: Should we throw an error if any of the directives is missing?
  }

}
