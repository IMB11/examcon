export function randomizeQuestionArray(questions: any[]): any[] {
  return questions.sort(() => Math.random() - 0.5);
}