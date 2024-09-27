import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { Question } from '../models';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() index!: number;
}
