import { effect, inject, Injectable, signal } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { Question } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly QUIZ_PARAM_TOPIC_LOCAL_STORAGE_KEY = 'quiz-param-topic';
  private readonly QUIZ_PARAM_COUNT_LOCAL_STORAGE_KEY = 'quiz-param-count';

  private readonly localStorageService = inject(LocalStorageService);

  // "Questions part":
  public questions = signal<Question[]>([]);

  public getCorrectQuestionCount(): number {
    const userAnswers = this.userAnswers();
    return this.questions().filter(
      (question, index) => question.answer.index === userAnswers[index],
    ).length;
  }

  // "User Answers" part:
  public userAnswers = signal<Array<number>>([]);

  public getUserAnswer(index: number): number {
    return this.userAnswers()[index];
  }

  public setUserAnswer(index: number, userAnswer: number): void {
    this.userAnswers.update((answers) => {
      answers[index] = userAnswer;
      return answers;
    });
  }

  public isAnswerProvided(index: number): boolean {
    return this.userAnswers()[index] !== undefined;
  }

  public resetUserAnswers(): void {
    this.userAnswers.set([]);
  }

  // "Topic" part:
  public topic = signal<string | null>(
    this.localStorageService.getData(this.QUIZ_PARAM_TOPIC_LOCAL_STORAGE_KEY),
  );

  private setTopicToLocalStorage = effect(() => {
    this.localStorageService.setData(
      this.QUIZ_PARAM_TOPIC_LOCAL_STORAGE_KEY,
      this.topic(),
    );
  });

  // "Count" part:
  public count = signal<number | null>(
    this.localStorageService.getData(this.QUIZ_PARAM_COUNT_LOCAL_STORAGE_KEY),
  );

  private setCountToLocalStorage = effect(() => {
    this.localStorageService.setData(
      this.QUIZ_PARAM_COUNT_LOCAL_STORAGE_KEY,
      this.count(),
    );
  });
}
