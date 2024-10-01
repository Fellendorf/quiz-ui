export interface Question {
  topic: string;
  text: string;
  code?: QuestionCode;
  answerOptions: string[];
  correctAnswerIndex: number;
}

export interface QuestionCode {
  text: string;
  language: 'typescript' | 'javascript' | 'html' | 'css';
}
