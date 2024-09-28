import { Component } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { Question } from './models';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuestionComponent, ButtonComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  public submitAnswer() {
    console.log('submitAnswer');
  }

  public submitNoAnswer() {
    console.log('submitNoAnswer');
  }

  public readonly questions: Question[] = [
    {
      topic: 'Angular',
      text: 'Which Angular directive is used to create a new component?',
      code: `@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css'],
})`,
      answers: ['Component', 'Directive', 'Module', 'Pipe'],
      correctAnswerIndexes: 1,
    },
  ];

  public index: number = 0;
}
