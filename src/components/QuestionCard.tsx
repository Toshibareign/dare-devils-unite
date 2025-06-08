
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Question } from '@/types/game';
import { getDifficultyColor } from '@/utils/gameUtils';

interface QuestionCardProps {
  question: Question;
  onComplete: (completed: boolean) => void;
}

export const QuestionCard = ({ question, onComplete }: QuestionCardProps) => {
  return (
    <Card className={`game-card ${question.type === 'truth' ? 'truth-card' : 'dare-card'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            className={question.type === 'truth' 
              ? 'bg-game-blue/20 text-game-blue border-game-blue/30' 
              : 'bg-game-pink/20 text-game-pink border-game-pink/30'
            }
          >
            {question.type.toUpperCase()}
          </Badge>
          <Badge variant="secondary" className={getDifficultyColor(question.difficulty)}>
            {question.difficulty.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="text-xl">{question.category}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CardDescription className="text-lg text-foreground leading-relaxed">
          {question.text}
        </CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => onComplete(true)}
            className="glow-button bg-gradient-to-r from-neon-green to-green-600 hover:from-neon-green/80 hover:to-green-600/80 flex-1"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Completed!
          </Button>
          <Button
            onClick={() => onComplete(false)}
            variant="outline"
            className="border-white/20 hover:border-white/40 flex-1"
          >
            <ArrowDown className="h-4 w-4 mr-2" />
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
