import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Question } from '../quiz/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  public getQuestions(
    topic: string,
    count: number = 10,
    isRandom: boolean = false
  ): Observable<Question[]> {
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
        topic: 'Angular1',
        text: 'Bla bla bla bla bla?',
        code: {
          text: `@Component({
    selector: 'app-new-component',
    templateUrl: './new-component.component.html',
    styleUrls: ['./new-component.component.css'],
  })`,
          language: 'typescript',
        },
        answerOptions: ['Component', 'Directive', 'Module', 'Pipe'],
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
