import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestaltador]'
})
export class RestaltadorDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.color = 'blue';
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.color = 'red';
  }

  constructor(private element: ElementRef) { 
    //this.element.nativeElement.style.color = 'blue';
  }



}
