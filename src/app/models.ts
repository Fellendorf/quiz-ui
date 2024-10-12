export interface Topic {
  name: string;
  questionCount: number;
}

export interface Question {
  topic: string;
  text: string;
  code?: QuestionCode;
  options: string[];
  answer: Answer;
  userAnswer?: number | null;
}

export interface Answer {
  index: number;
  explanation?: string;
}

export interface QuestionCode {
  text: string;
  language: 'typescript' | 'javascript' | 'html' | 'css';
}

export interface QuizParams {
  topic: string;
  questionsCount: number;
}

export enum GlobalEvents {
  answer = 'answer',
  uncheckInputs = 'uncheckInputs',
}
