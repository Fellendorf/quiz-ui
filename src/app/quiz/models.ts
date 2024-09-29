export interface Question {
  topic: string;
  text: string;
  code?: {
    text: string;
    language: 'typescript' | 'javascript' | 'html' | 'css';
  };
  answerOptions: string[];
  correctAnswerIndex: number;
}
