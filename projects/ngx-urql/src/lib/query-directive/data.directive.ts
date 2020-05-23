import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[gqlData]'
})
export class DataDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  public showContent(data?: unknown): void {
    console.log('[DataDirective]: show content called');

    const show = data !== undefined;
    if (this.hasView === show) {
      return;
    }

    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef, {$implicit: data});
      this.hasView = true;
    } else {
      this.viewContainer.clear()
      this.hasView = false;
    }
  }

}
