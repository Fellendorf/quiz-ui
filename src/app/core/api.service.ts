import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Question, QuizParams, TopicData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //TODO: add error handling
  private readonly API_BASE_URL = import.meta.env.NG_APP_API_URL;

  private readonly http = inject(HttpClient);

  public getTopics(): Observable<TopicData[]> {
    return this.http.get<TopicData[]>(`${this.API_BASE_URL}/topics`);
  }

  public getQuestions(topic: string, count = 0): Observable<Question[]> {
    return this.http
      .get<Question[]>(`${this.API_BASE_URL}/questions`, {
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
    return this.http.put<Question>(`${this.API_BASE_URL}/question`, question);
  }
}
