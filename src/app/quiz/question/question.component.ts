import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Question } from '../models';
import { ButtonComponent } from '../../shared/button/button.component';
import hljs from 'highlight.js';

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

  public emitAnswer(event: Event) {
    if (event.target && event.target instanceof HTMLInputElement) {
      this.answer.emit(Number(event.target.value));
    }
  }

  public ngAfterViewInit() {
    if (this.question.code) {
      this.highlightCode();
    }
  }

  private highlightCode() {
    hljs.highlightElement(document.querySelector('pre code')!);
  }
}
