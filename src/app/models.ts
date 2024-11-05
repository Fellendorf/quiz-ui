export interface TopicData {
  name: string;
  questionCount: number;
}

export interface Question {
  _id?: string;
  topic: string;
  subtopic?: string;
  text: string;
  code?: Code;
  options: Option[];
  explanation?: string;
  reviewed?: boolean;
  difficult?: Difficulty;
  createdAt: Date;
  updatedAt: Date;
}

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Code {
  text: string;
  language: 'typescript' | 'javascript' | 'html' | 'css';
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
