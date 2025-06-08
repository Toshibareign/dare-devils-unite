
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Star, Users, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameBoardProps {
  gameMode: 'kids' | 'teens' | 'adults' | 'couples';
}

type QuestionType = 'truth' | 'dare';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export const GameBoard = ({ gameMode }: GameBoardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameStats, setGameStats] = useState({
    truthsCompleted: 0,
    daresCompleted: 0,
    totalScore: 0,
    currentStreak: 0
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const { toast } = useToast();

  // Sample questions based on game mode
  const questions: Record<string, Question[]> = {
    kids: [
      { id: '1', type: 'truth', text: 'What is your favorite cartoon character and why?', difficulty: 'easy', category: 'fun' },
      { id: '2', type: 'dare', text: 'Do your best superhero pose for 10 seconds!', difficulty: 'easy', category: 'silly' },
      { id: '3', type: 'truth', text: 'What is the silliest thing you believed when you were younger?', difficulty: 'medium', category: 'memories' },
      { id: '4', type: 'dare', text: 'Sing your favorite song in a funny voice!', difficulty: 'medium', category: 'performance' }
    ],
    teens: [
      { id: '1', type: 'truth', text: 'Who was your first crush and do you still think about them?', difficulty: 'medium', category: 'romance' },
      { id: '2', type: 'dare', text: 'Text your parents "I love you" right now!', difficulty: 'easy', category: 'family' },
      { id: '3', type: 'truth', text: 'What is the most embarrassing thing that happened to you at school?', difficulty: 'hard', category: 'embarrassing' },
      { id: '4', type: 'dare', text: 'Do 20 push-ups or jumping jacks!', difficulty: 'medium', category: 'physical' }
    ],
    adults: [
      { id: '1', type: 'truth', text: 'What is something you did that you never told anyone about?', difficulty: 'hard', category: 'secrets' },
      { id: '2', type: 'dare', text: 'Call someone you haven\'t talked to in over a year!', difficulty: 'hard', category: 'social' },
      { id: '3', type: 'truth', text: 'What is your biggest regret in life so far?', difficulty: 'hard', category: 'deep' },
      { id: '4', type: 'dare', text: 'Share an embarrassing photo from your camera roll!', difficulty: 'medium', category: 'social' }
    ],
    couples: [
      { id: '1', type: 'truth', text: 'What was your first impression of me when we met?', difficulty: 'medium', category: 'relationship' },
      { id: '2', type: 'dare', text: 'Give your partner a 30-second massage!', difficulty: 'easy', category: 'romantic' },
      { id: '3', type: 'truth', text: 'What is one thing you wish I did more often?', difficulty: 'hard', category: 'relationship' },
      { id: '4', type: 'dare', text: 'Write a love poem about your partner in 2 minutes!', difficulty: 'hard', category: 'creative' }
    ]
  };

  const getRandomQuestion = (type?: QuestionType) => {
    const modeQuestions = questions[gameMode] || questions.teens;
    const filteredQuestions = type ? modeQuestions.filter(q => q.type === type) : modeQuestions;
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
  };

  const spinForQuestion = (type?: QuestionType) => {
    setIsSpinning(true);
    
    // Simulate spinning animation
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'hard': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

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

      {/* Main Game Area */}
      <div className="max-w-2xl mx-auto space-y-6">
        {!currentQuestion && !isSpinning && (
          <div className="space-y-6">
            <Card className="game-card text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Choose Your Challenge</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => spinForQuestion('truth')}
                    size="lg"
                    className="glow-button bg-gradient-to-r from-game-blue to-game-purple hover:from-game-blue/80 hover:to-game-purple/80 px-8 py-4"
                  >
                    <Star className="h-5 w-5 mr-2" />
                    Truth
                  </Button>
                  <Button
                    onClick={() => spinForQuestion('dare')}
                    size="lg"
                    className="glow-button bg-gradient-to-r from-game-pink to-red-500 hover:from-game-pink/80 hover:to-red-500/80 px-8 py-4"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Dare
                  </Button>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => spinForQuestion()}
                    variant="outline"
                    size="lg"
                    className="border-white/20 hover:border-white/40 px-8 py-4"
                  >
                    🎲 Random Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isSpinning && (
          <Card className="game-card text-center">
            <CardContent className="p-8">
              <div className="animate-spin w-16 h-16 bg-gradient-to-r from-game-purple to-game-blue rounded-full mx-auto mb-4"></div>
              <h3 className="text-2xl font-bold mb-2">Spinning...</h3>
              <p className="text-muted-foreground">Preparing your challenge!</p>
            </CardContent>
          </Card>
        )}

        {currentQuestion && !isSpinning && (
          <Card className={`game-card ${currentQuestion.type === 'truth' ? 'truth-card' : 'dare-card'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className={currentQuestion.type === 'truth' 
                    ? 'bg-game-blue/20 text-game-blue border-game-blue/30' 
                    : 'bg-game-pink/20 text-game-pink border-game-pink/30'
                  }
                >
                  {currentQuestion.type.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className={getDifficultyColor(currentQuestion.difficulty)}>
                  {currentQuestion.difficulty.toUpperCase()}
                </Badge>
              </div>
              <CardTitle className="text-xl">{currentQuestion.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CardDescription className="text-lg text-foreground leading-relaxed">
                {currentQuestion.text}
              </CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => completeChallenge(true)}
                  className="glow-button bg-gradient-to-r from-neon-green to-green-600 hover:from-neon-green/80 hover:to-green-600/80 flex-1"
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Completed!
                </Button>
                <Button
                  onClick={() => completeChallenge(false)}
                  variant="outline"
                  className="border-white/20 hover:border-white/40 flex-1"
                >
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Skip
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
