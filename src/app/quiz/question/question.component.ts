import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../models';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() public question!: Question;
  @Output() public answer = new EventEmitter<number>();

  emitAnswer(event: Event) {
    if (event.target && event.target instanceof HTMLInputElement) {
      this.answer.emit(Number(event.target.value));
    }
  }
}
