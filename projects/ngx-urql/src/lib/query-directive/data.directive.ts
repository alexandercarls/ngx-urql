import {ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {QueryResult} from '../operations/query';

export class DataContext<T> {
  constructor(public $implicit: T) {
  }
}

@Directive({
  selector: '[gqlData]'
})
export class DataDirective<T> {
  @Input('gqlData') query!: Observable<QueryResult<T>>;

  private hasView = false;

  constructor(private templateRef: TemplateRef<DataContext<T>>,
              private viewContainer: ViewContainerRef,
              private cdr: ChangeDetectorRef,
  ) {
  }

  public showContent(data?: T): void {
    const show = data !== undefined;
    if (this.hasView === show) {
      return;
    }

    if (show) {
      // TODO: Type is not inferred
      if (data === undefined) {
        throw new Error('`data` must not be undefined');
      }

      this.viewContainer.createEmbeddedView(this.templateRef, new DataContext<T>(data));
      this.cdr.markForCheck();
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
