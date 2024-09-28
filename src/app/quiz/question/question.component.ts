import { Component, Input } from '@angular/core';
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
  @Input() question!: Question;
}
