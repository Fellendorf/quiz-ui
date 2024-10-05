import { Injectable } from '@angular/core';
import { Question } from '../quiz-screen/models';

// TODO: change to NgRX
@Injectable({
  providedIn: 'root',
})
export class QuizService {
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
}
