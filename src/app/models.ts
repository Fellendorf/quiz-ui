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
  links?: string[];
  difficult?: Difficulty;
  reviewed?: boolean;
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

export enum ROUTE_PATHES {
  MENU = '',
  QUIZ = 'quiz',
  RESULTS = 'results',
  SETTINGS = 'settings',
  QUESTION = 'question',
  ADMIN_QUESTIONS = 'admin-questions',
}
