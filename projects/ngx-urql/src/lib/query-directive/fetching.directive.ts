import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

// TODO: Maybe rename `fetching` to `loading`

@Directive({
  selector: '[gqlFetching]'
})
export class FetchingDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  public showContent(show: boolean): void {

    if (this.hasView === show) {
      return;
    }

    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
