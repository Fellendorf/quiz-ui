import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question, QuizParams, Topic } from '../quiz-screen/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public getTopics(): Observable<Topic[]> {
    const response: Topic[] = ['Angular', 'HTML', 'RxJS', 'CSS'];

    return this.request(response);
  }

  public getQuestions({
    topic,
    questionsCount,
    isRandom = false,
  }: QuizParams): Observable<Question[]> {
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
        options: [
          'Component Component Component Component Component Component Component Component Component Component Component Component Component Component Component',
          'Directive',
          'Module',
          'Pipe',
        ],
        answer: {
          index: 1,
        },
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
        },
      },
    ];

    return this.request(response);
  }

  private request<T>(response: T) {
    return new Observable<T>((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 500);
    });
  }
}
