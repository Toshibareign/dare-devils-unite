
export type GameMode = 'kids' | 'teens' | 'adults' | 'couples';
export type QuestionType = 'truth' | 'dare';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  difficulty: Difficulty;
  category: string;
}

export interface GameStats {
  truthsCompleted: number;
  daresCompleted: number;
  totalScore: number;
  currentStreak: number;
}
