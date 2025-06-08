
import { useState } from 'react';
import { Question, QuestionType, GameMode, GameStats } from '@/types/game';
import { questions } from '@/data/questions';
import { useToast } from '@/hooks/use-toast';

export const useGameLogic = (gameMode: GameMode) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({
    truthsCompleted: 0,
    daresCompleted: 0,
    totalScore: 0,
    currentStreak: 0
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const { toast } = useToast();

  const getRandomQuestion = (type?: QuestionType) => {
    const modeQuestions = questions[gameMode] || questions.teens;
    const filteredQuestions = type ? modeQuestions.filter(q => q.type === type) : modeQuestions;
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
  };

  const spinForQuestion = (type?: QuestionType) => {
    setIsSpinning(true);
    
    setTimeout(() => {
      const newQuestion = getRandomQuestion(type);
      setCurrentQuestion(newQuestion);
      setIsSpinning(false);
      
      toast({
        title: `${newQuestion.type.charAt(0).toUpperCase() + newQuestion.type.slice(1)} Selected!`,
        description: `Get ready for a ${newQuestion.difficulty} challenge!`,
      });
    }, 1500);
  };

  const completeChallenge = (completed: boolean) => {
    if (!currentQuestion) return;

    if (completed) {
      const points = currentQuestion.difficulty === 'easy' ? 10 : currentQuestion.difficulty === 'medium' ? 20 : 30;
      
      setGameStats(prev => ({
        ...prev,
        [currentQuestion.type === 'truth' ? 'truthsCompleted' : 'daresCompleted']: 
          prev[currentQuestion.type === 'truth' ? 'truthsCompleted' : 'daresCompleted'] + 1,
        totalScore: prev.totalScore + points,
        currentStreak: prev.currentStreak + 1
      }));

      toast({
        title: "Challenge Completed! 🎉",
        description: `You earned ${points} points! Keep the streak going!`,
      });
    } else {
      setGameStats(prev => ({ ...prev, currentStreak: 0 }));
      
      toast({
        title: "Challenge Skipped",
        description: "No worries! Try another one!",
        variant: "destructive"
      });
    }

    setCurrentQuestion(null);
  };

  return {
    currentQuestion,
    gameStats,
    isSpinning,
    spinForQuestion,
    completeChallenge
  };
};
