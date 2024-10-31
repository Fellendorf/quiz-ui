import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';

import { Question, TopicData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  public getTopics(): Observable<TopicData[]> {
    return this.http.get<TopicData[]>('/topics');
  }

  public getQuestions(topic: string, count = 0): Observable<Question[]> {
    return this.http
      .get<Question[]>('/questions', {
        params: {
          'topics[]': topic,
          count,
        },
      })
      .pipe(
        map((questions) =>
          questions.map((question) =>
            !question.meta
              ? { ...question, meta: { reviewed: false } }
              : question,
          ),
        ),
      );
  }

  public updateQuestion(question: Question) {
    return this.http.put<Question>('/question', question);
  }

  public checkPassword(password: string) {
    return this.http.post<{ isAdmin: boolean }>('/password', {
      password,
    });
  }
}
