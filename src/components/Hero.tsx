
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Heart } from "lucide-react";

interface HeroProps {
  onStartGame: () => void;
}

export const Hero = ({ onStartGame }: HeroProps) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center space-y-8">
        {/* Main Hero Content */}
        <div className="space-y-6">
          <Badge variant="secondary" className="bg-game-purple/20 text-game-purple border-game-purple/30 text-sm px-4 py-2">
            🎉 Over 1M+ Games Played Worldwide!
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-game-purple via-game-blue to-game-pink bg-clip-text text-transparent animate-pulse-scale">
              Truth & Dare
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The ultimate party game that brings friends together! 
            Share epic stories, create unforgettable memories, and discover what your friends really think.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={onStartGame}
            size="lg"
            className="glow-button bg-gradient-to-r from-game-purple to-game-blue hover:from-game-purple/80 hover:to-game-blue/80 px-8 py-4 text-lg font-semibold animate-glow"
          >
            🎮 Start Playing Now
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/20 hover:border-white/40 px-8 py-4 text-lg font-semibold"
          >
            📖 Browse Stories
          </Button>
        </div>

        {/* Floating Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="game-card animate-float truth-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-game-blue to-game-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Truth Revelations</h3>
              <p className="text-muted-foreground">
                Discover secrets and share honest moments with friends in a safe, fun environment.
              </p>
            </CardContent>
          </Card>

          <Card className="game-card animate-float dare-card" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-game-pink to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Epic Dares</h3>
              <p className="text-muted-foreground">
                Challenge yourself and friends with exciting dares that create unforgettable memories.
              </p>
            </CardContent>
          </Card>

          <Card className="game-card animate-float" style={{ animationDelay: '1s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-game-cyan to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Community</h3>
              <p className="text-muted-foreground">
                Join millions of players worldwide and share your stories with our amazing community.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
