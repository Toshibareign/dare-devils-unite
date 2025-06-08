
import { Difficulty } from '@/types/game';

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy': return 'text-green-400 bg-green-400/20 border-green-400/30';
    case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
    case 'hard': return 'text-red-400 bg-red-400/20 border-red-400/30';
    default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
  }
};
