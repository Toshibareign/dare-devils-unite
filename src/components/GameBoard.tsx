
import { GameMode } from '@/types/game';
import { useGameLogic } from '@/hooks/useGameLogic';
import { GameStats } from '@/components/GameStats';
import { GameSelector } from '@/components/GameSelector';
import { SpinningLoader } from '@/components/SpinningLoader';
import { QuestionCard } from '@/components/QuestionCard';

interface GameBoardProps {
  gameMode: GameMode;
}

export const GameBoard = ({ gameMode }: GameBoardProps) => {
  const {
    currentQuestion,
    gameStats,
    isSpinning,
    spinForQuestion,
    completeChallenge
  } = useGameLogic(gameMode);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Game Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-game-purple to-game-blue bg-clip-text text-transparent">
          {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)} Mode
        </h1>
        <p className="text-muted-foreground text-lg">
          Ready for some fun? Choose Truth or Dare to get started!
        </p>
      </div>

      {/* Game Stats */}
      <GameStats gameStats={gameStats} />

      {/* Main Game Area */}
      <div className="max-w-2xl mx-auto space-y-6">
        {!currentQuestion && !isSpinning && (
          <GameSelector onSpinForQuestion={spinForQuestion} />
        )}

        {isSpinning && <SpinningLoader />}

        {currentQuestion && !isSpinning && (
          <QuestionCard 
            question={currentQuestion} 
            onComplete={completeChallenge} 
          />
        )}
      </div>
    </div>
  );
};
