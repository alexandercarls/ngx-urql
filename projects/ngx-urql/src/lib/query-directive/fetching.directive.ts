import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[gqlFetching]'
})
export class FetchingDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  public showContent(show: boolean): void {
    console.log('[FetchingDirective]: show content called');

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
