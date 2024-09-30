import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import hljs from 'highlight.js';

import { Question } from '../models';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements AfterViewInit {
  @Input() public question!: Question;
  @Output() public answer = new EventEmitter<number>();
  @ViewChild('code') public codeElRef!: ElementRef<HTMLElement>;

  public emitAnswer(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.answer.emit(Number(event.target.value));
    }
  }

  public ngAfterViewInit() {
    this.highlightCode(this.codeElRef?.nativeElement);
  }

  private highlightCode(codeEl: HTMLElement) {
    if (!codeEl) return;
    hljs.highlightElement(codeEl);
  }
}
