import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Question } from '../models';
import { ButtonComponent } from '../../shared/button/button.component';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ButtonComponent, CodeComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  @Input() public question!: Question;
  @Output() public answer = new EventEmitter<number>();

  public emitAnswer(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.answer.emit(Number(event.target.value));
    }
  }
}
