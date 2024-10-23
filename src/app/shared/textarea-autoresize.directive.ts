import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]',
  standalone: true,
})
export class TextareaAutoresizeDirective implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLTextAreaElement>);

  public ngAfterViewInit(): void {
    this.resize();
    this.elementRef.nativeElement.style.resize = 'none';
  }

  @HostListener(':input')
  private onInput() {
    this.resize();
  }

  private resize() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = `${this.elementRef.nativeElement.scrollHeight}px`;
  }
}
