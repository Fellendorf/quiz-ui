export interface Question {
  topic: string;
  text: string;
  code: string;
  answers: string[];
  correctAnswerIndexes: number | number[];
}
