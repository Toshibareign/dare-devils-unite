
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { QuestionType } from '@/types/game';

interface GameSelectorProps {
  onSpinForQuestion: (type?: QuestionType) => void;
}

export const GameSelector = ({ onSpinForQuestion }: GameSelectorProps) => {
  return (
    <Card className="game-card text-center">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-6">Choose Your Challenge</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onSpinForQuestion('truth')}
            size="lg"
            className="glow-button bg-gradient-to-r from-game-blue to-game-purple hover:from-game-blue/80 hover:to-game-purple/80 px-8 py-4"
          >
            <Star className="h-5 w-5 mr-2" />
            Truth
          </Button>
          <Button
            onClick={() => onSpinForQuestion('dare')}
            size="lg"
            className="glow-button bg-gradient-to-r from-game-pink to-red-500 hover:from-game-pink/80 hover:to-red-500/80 px-8 py-4"
          >
            <Heart className="h-5 w-5 mr-2" />
            Dare
          </Button>
        </div>
        <div className="mt-6">
          <Button
            onClick={() => onSpinForQuestion()}
            variant="outline"
            size="lg"
            className="border-white/20 hover:border-white/40 px-8 py-4"
          >
            🎲 Random Challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
