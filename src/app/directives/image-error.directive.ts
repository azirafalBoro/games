// import {Directive, HostBinding, HostListener, Input} from '@angular/core';

// @Directive({
//   selector: '[appDefault]',
// })
// export class ImageErrorDirective {
//   @Input() src: string | undefined;
//   @Input() default: string | undefined;
//   @HostBinding('class') className: string | undefined;
//   @HostListener('error') updateUrl(): void {
//     this.src = this.default;
//   }
//   @HostListener('load') load(): void {
//     this.className = 'image-loaded';
//   }
//
// }

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
