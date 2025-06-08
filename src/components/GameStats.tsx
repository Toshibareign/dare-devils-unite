
import { Card, CardContent } from "@/components/ui/card";
import { GameStats as GameStatsType } from '@/types/game';

interface GameStatsProps {
  gameStats: GameStatsType;
}

export const GameStats = ({ gameStats }: GameStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="game-card">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-game-blue">{gameStats.truthsCompleted}</div>
          <div className="text-sm text-muted-foreground">Truths</div>
        </CardContent>
      </Card>
      <Card className="game-card">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-game-pink">{gameStats.daresCompleted}</div>
          <div className="text-sm text-muted-foreground">Dares</div>
        </CardContent>
      </Card>
      <Card className="game-card">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-neon-green">{gameStats.totalScore}</div>
          <div className="text-sm text-muted-foreground">Score</div>
        </CardContent>
      </Card>
      <Card className="game-card">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{gameStats.currentStreak}</div>
          <div className="text-sm text-muted-foreground">Streak</div>
        </CardContent>
      </Card>
    </div>
  );
};
