import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, QuizParams } from '../quiz/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  public getQuestions({
    topic,
    questionsCount,
    isRandom = false,
  }: QuizParams): Observable<Question[]> {
    console.log();
    const response: Question[] = [
      {
        topic: 'Angular',
        text: 'Which Angular directive is used to create a new component?',
        code: {
          text: `input {
  appearance: none;
}`,
          language: 'css',
        },
        answerOptions: ['Component', 'Directive', 'Module', 'Pipe'],
        correctAnswerIndex: 1,
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
        answerOptions: [
          'Component 1',
          'Directive 1',
          'Module 1',
          'Pipe 1',
          'bla',
        ],
        correctAnswerIndex: 1,
      },
    ];

    let obs = new Observable<Question[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });
    return obs;
  }
}
