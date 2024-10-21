import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, QuizParams, Topic } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //TODO: add error handling
  private readonly API_BASE_URL = import.meta.env.NG_APP_API_URL;

  private readonly http = inject(HttpClient);

  public getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.API_BASE_URL}/topics`);
  }

  public getQuestions({ topic, count }: QuizParams): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.API_BASE_URL}/questions`, {
      params: {
        'topics[]': topic,
        count,
      },
    });
  }
}
