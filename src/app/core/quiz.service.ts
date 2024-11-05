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
    return this.userAnswers().filter((userAnswer, questionIndex) => {
      return this.isUserAnswerCorrect(questionIndex);
    }).length;
  }

  // "User Answers" part:
  public userAnswers = signal<Array<number[]>>([]);

  public getUserAnswer(questionIndex: number): number[] {
    return this.userAnswers()[questionIndex];
  }

  public setUserAnswer(questionIndex: number, answerIndexes: number[]): void {
    this.userAnswers.update((answers) => {
      answers[questionIndex] = answerIndexes;
      return answers;
    });
  }

  public isUserAnswerCorrect(questionIndex: number): boolean {
    const userAnswer = this.userAnswers()[questionIndex];
    const correctOptions = this.questions()[questionIndex].options.reduce(
      (result, option, index) => {
        if (option.isCorrect) {
          result.push(index);
        }
        return result;
      },
      [] as number[],
    );
    return (
      correctOptions.every((optionIndex) => userAnswer.includes(optionIndex)) &&
      correctOptions.length === userAnswer.length
    );
  }

  public isAnswerProvided(index: number): boolean {
    return !!this.userAnswers()[index]?.length;
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
