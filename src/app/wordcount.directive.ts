import { Directive, ElementRef, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appWordcount]'
})
export class WordcountDirective implements AfterViewInit {
  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.element.nativeElement.title = `Contains ${this.element.nativeElement.innerText.split(' ').length.toString()} word(s)`;
  }
}
