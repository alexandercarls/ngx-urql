import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {CombinedError} from '@urql/core';

@Directive({
  selector: '[gqlError]'
})
export class ErrorDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  public showContent(error?: CombinedError): void {
    console.log('[ErrorDirective]: show content called');

    const show = error !== undefined;
    if (this.hasView === show) {
      return;
    }

    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef, {$implicit: error});
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
