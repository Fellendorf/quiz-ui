import { Injectable } from '@angular/core';
import { Question } from '../quiz-screen/models';

// TODO: change to NgRX
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // public questions!: Array<Question | AnsweredQuestion>;
  public questions: Array<Question> = [
    {
      topic: 'Angular',
      text: 'Which Angular directive is used to create a new component?',
      code: {
        text: `input {
appearance: none;
}`,
        language: 'css',
      },
      options: ['Component', 'Directive', 'Module', 'Pipe'],
      answer: {
        index: 1,
        explanation: 'lorem ipsum dolor sit amet, consectetur adip',
      },
      userAnswer: 1,
    },
    {
      topic: 'Angular 1',
      text: 'Bla bla bla bla bla?',
      code: {
        text: `@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css'],
})`,
        language: 'typescript',
      },
      options: ['Component 1', 'Directive 1', 'Module 1', 'Pipe 1', 'bla'],
      answer: {
        index: 1,
        explanation: 'lorem ipsum dolor sit amet, consectetur adip',
      },
      userAnswer: null,
    },
  ];

  public setAnswer(index: number, userAnswer: Question['userAnswer']): void {
    this.questions[index].userAnswer = userAnswer;
  }

  public hasAnswer(index: number): boolean {
    return this.questions[index].userAnswer !== null;
  }

  public resetQuestions(): void {
    this.questions = [];
  }
}
