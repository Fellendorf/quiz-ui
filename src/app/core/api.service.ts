import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<Question[]>('/questions', {
      params: {
        'topics[]': topic,
        count,
      },
    });
  }

  public getQuestion(id: string) {
    return this.http.get<Question>('/question', {
      params: {
        id,
      },
    });
  }

  public updateQuestion(question: Question) {
    return this.http.put<{ message: string }>('/question', question);
  }

  public createQuestion(question: Question) {
    return this.http.post<{ message: string }>('/question', question);
  }

  public checkPassword(password: string) {
    return this.http.post<{ isAdmin: boolean }>('/password', {
      password,
    });
  }
}
