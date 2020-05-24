import {AfterContentInit, ContentChild, Directive, Input, OnDestroy} from '@angular/core';
import {QueryResult} from '../operations/query';
import {DataDirective} from './data.directive';
import {FetchingDirective} from './fetching.directive';
import {ErrorDirective} from './error.directive';
import {Observable, Subscription} from 'rxjs';

// TODO: The directive allow for partial results per default (i.e. displaying the error **and** the data.
//   Do we need to add an option to disable that behaviour?

@Directive({
  selector: '[gqlQuery]',
})
export class QueryDirective<T> implements AfterContentInit, OnDestroy {
  @ContentChild(DataDirective) dataDirective: DataDirective<T> | null = null;
  @ContentChild(FetchingDirective) fetchDirective: FetchingDirective | null = null;
  @ContentChild(ErrorDirective) errorDirective: ErrorDirective | null = null;

  public sub: Subscription | null = null;
  private innerQuery!: Observable<QueryResult<T>>;

  @Input('gqlQuery')
  public set query(value: Observable<QueryResult<T>>) {
    if (value === null) {
      console.log('[QueryDirective]: value is null');
      return;
    }

    console.log('[QueryDirective]: Input changed - ', new Date().getTime());

    // TODO: We need to re-sub if the Observable changes
    this.innerQuery = value;
  }

  public ngAfterContentInit(): void {
    console.log('[QueryDirective]: ngAfterContentInit - ', new Date().getTime());
    // TODO: Delay fetching state by 100ms, test, as the content init is delayed by default?
    //   it is always 1ms, and via 6x throttling and fast 3g, about 8ms.

    this.sub = this.innerQuery.subscribe(r => {
      console.log(r);
      this.fetchDirective?.showContent(r.fetching);

      // We need to force remove the content if the query has no data (i.e. is fetching or has an error)
      // In the future the might be a UX patter where we can display the previous fetched content
      // while a new request is fetching.
      this.dataDirective?.showContent(r?.data);
      this.errorDirective?.showContent(r?.error);
      // TODO: Should we throw an error if any of the directives is missing?
    });
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
