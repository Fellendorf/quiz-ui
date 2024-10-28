import { inject, Injectable } from '@angular/core';
import { Question, QuizParams, TopicData } from '../models';
import { LocalStorageService } from './local-storage.service';

// TODO: change to NgRX
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly QUIZ_PARAM_TOPIC_LOCAL_STORAGE_KEY = 'quiz-param-topic';
  private readonly QUIZ_PARAM_COUNT_LOCAL_STORAGE_KEY = 'quiz-param-count';

  private readonly localStorageService = inject(LocalStorageService);

  public questions!: Array<Question>;

  public setAnswer(index: number, userAnswer: Question['userAnswer']): void {
    this.questions[index].userAnswer = userAnswer;
  }

  public isAnswered(index: number): boolean {
    return this.questions[index].hasOwnProperty('userAnswer');
  }

  public resetQuestions(): void {
    this.questions = [];
  }

  public getTopic(): string | null {
    return this.localStorageService.getData(
      this.QUIZ_PARAM_TOPIC_LOCAL_STORAGE_KEY,
    );
  }

  public setTopic(topic: string | null): void {
    if (topic) {
      this.localStorageService.setData(
        this.QUIZ_PARAM_TOPIC_LOCAL_STORAGE_KEY,
        topic,
      );
    }
  }

  public getCount(): number | null {
    return this.localStorageService.getData(
      this.QUIZ_PARAM_COUNT_LOCAL_STORAGE_KEY,
    );
  }

  public setCount(count: number | null): void {
    if (count) {
      this.localStorageService.setData(
        this.QUIZ_PARAM_COUNT_LOCAL_STORAGE_KEY,
        count,
      );
    }
  }
}
