export interface TopicData {
  name: string;
  questionCount: number;
}

export interface Question {
  _id: string;
  topic: string;
  text: string;
  code?: QuestionCode;
  options: string[];
  answer: Answer;
  userAnswer?: number | null;
  meta?: Meta;
}

export interface Answer {
  index: number;
  explanation?: string;
}

export interface QuestionCode {
  text: string;
  language: 'typescript' | 'javascript' | 'html' | 'css';
}

interface Meta {
  reviewed?: boolean;
  difficult?: Difficulty;
}

type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizParams {
  topic: string;
  count: number;
}

export enum GlobalEvents {
  answer = 'answer',
  questionChanged = 'questionChanged',
}
