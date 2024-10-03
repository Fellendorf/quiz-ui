export interface Question {
  topic: string;
  text: string;
  code?: QuestionCode;
  options: string[];
  answer: Answer;
}

export interface Answer {
  index: number;
  explanation?: string;
}

export interface AnsweredQuesion extends Question {
  userAnswer: number | null;
}

export interface QuestionCode {
  text: string;
  language: 'typescript' | 'javascript' | 'html' | 'css';
}

export interface QuizParams {
  topic: string;
  questionsCount: number;
  isRandom?: boolean;
}

export enum GlobalEvents {
  answer = 'answer',
  uncheckInputs = 'uncheckInputs',
}
