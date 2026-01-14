export type Difficulty = "Easy" | "Medium" | "Hard";

export type QuizConfig = {
  title: string;
  subject: string;
  gradeLevel: string;
  questionCount: number;
  difficulty: Difficulty;
  prompt: string;
};

export type Choice = { id: string; text: string };

export type GeneratedQuestion = {
  id: string;
  question: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation?: string;
};
