import { inject, Injectable } from '@angular/core';
import { Question, QuizParams, Topic } from '../models';
import { LocalStorageService } from './local-storage.service';

// TODO: change to NgRX
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly QUIZ_PARAMS_LOCAL_STORAGE_KEY = 'quiz-params';

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

  public setTopic(topic: Topic): void {
    this.setQuizParams({ ...this.getQuizParams(), topic: topic.name });
  }

  public setQuestionCount(count: number): void {
    this.setQuizParams({ ...this.getQuizParams(), questionsCount: count });
  }

  public getQuizParams(): QuizParams {
    return this.localStorageService.getData(
      this.QUIZ_PARAMS_LOCAL_STORAGE_KEY,
    ) as QuizParams;
  }

  private setQuizParams(params: QuizParams): void {
    this.localStorageService.setData(
      this.QUIZ_PARAMS_LOCAL_STORAGE_KEY,
      params,
    );
  }
}
