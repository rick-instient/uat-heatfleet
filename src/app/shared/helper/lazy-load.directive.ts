import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.lazyLoad();
  }

  ngAfterViewInit() {
    this.lazyLoad();
  }

  private lazyLoad() {
    const element = this.el.nativeElement as HTMLImageElement;
    console.log(element.getAttribute('data-src'));
    
    const rect = element.getBoundingClientRect();

    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      this.renderer.setAttribute(
        element,
        'srcset',
        `${element.getAttribute('data-src')}`
      );
      element.removeAttribute('data-srcset');
    }
  }
}
