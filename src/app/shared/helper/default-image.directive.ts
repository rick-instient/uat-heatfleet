import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ion-img[default]',
  host: {
    '(ionError)': 'updateUrl()',
    '[src]': 'src',
  },
})
export class DefaultImageDirective {
  @Input() src: string;
  @Input() default: string;
  public DEF_IMAGE =
    '/assets/icon/9m-Heat-Fleet-Heating-Oil-Logo.svg';
  public updateUrl(): void {
    // debugger;
    if (this.default != '') {
      this.src = this.default;
    } else {
      this.src = this.DEF_IMAGE;
    }
  }
}
