import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appDefault]',
})
export class ImageErrorDirective {
  @Input() default: string | undefined;

  constructor(private element: ElementRef) { }

  @HostListener('error') updateUrl(): void {
    this.element.nativeElement.attributes.src.value = this.default;
  }
}
