
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, Users, Bell } from "lucide-react";

interface GameModeSelectorProps {
  gameMode: 'kids' | 'teens' | 'adults' | 'couples';
  onModeChange: (mode: 'kids' | 'teens' | 'adults' | 'couples') => void;
}

export const GameModeSelector = ({ gameMode, onModeChange }: GameModeSelectorProps) => {
  const modes = [
    {
      id: 'kids' as const,
      title: 'Kids Mode',
      description: 'Fun and safe questions for children',
      icon: Star,
      color: 'from-yellow-400 to-orange-500',
      badge: 'Ages 8-12',
      badgeColor: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'
    },
    {
      id: 'teens' as const,
      title: 'Teen Mode',
      description: 'Perfect for teenage friends and parties',
      icon: Users,
      color: 'from-game-blue to-game-purple',
      badge: 'Ages 13-17',
      badgeColor: 'bg-game-blue/20 text-game-blue border-game-blue/30'
    },
    {
      id: 'adults' as const,
      title: 'Adult Mode',
      description: 'Mature content for grown-up fun',
      icon: Bell,
      color: 'from-game-purple to-game-pink',
      badge: 'Ages 18+',
      badgeColor: 'bg-game-purple/20 text-game-purple border-game-purple/30'
    },
    {
      id: 'couples' as const,
      title: 'Couples Mode',
      description: 'Intimate questions for romantic partners',
      icon: Heart,
      color: 'from-game-pink to-red-500',
      badge: 'Romance',
      badgeColor: 'bg-game-pink/20 text-game-pink border-game-pink/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = gameMode === mode.id;
        
        return (
          <Card
            key={mode.id}
            className={`game-card cursor-pointer transition-all duration-300 ${
              isSelected 
                ? 'ring-2 ring-white/50 scale-105 shadow-2xl' 
                : 'hover:scale-105'
            }`}
            onClick={() => onModeChange(mode.id)}
          >
            <CardHeader className="text-center pb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${mode.color} rounded-full flex items-center justify-center mx-auto mb-3 ${isSelected ? 'animate-pulse-scale' : ''}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <Badge variant="secondary" className={`${mode.badgeColor} mb-2`}>
                {mode.badge}
              </Badge>
              <CardTitle className="text-lg">{mode.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <CardDescription className="mb-4">
                {mode.description}
              </CardDescription>
              <Button
                variant={isSelected ? "default" : "outline"}
                className={`w-full ${
                  isSelected 
                    ? `bg-gradient-to-r ${mode.color}` 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                {isSelected ? 'Selected' : 'Select Mode'}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
