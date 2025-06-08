
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameBoard } from "@/components/GameBoard";
import { StoryFeed } from "@/components/StoryFeed";
import { UserProfile } from "@/components/UserProfile";
import { GameModeSelector } from "@/components/GameModeSelector";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Users, Star, Heart, MessageCircle } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'game' | 'stories' | 'profile'>('home');
  const [gameMode, setGameMode] = useState<'kids' | 'teens' | 'adults' | 'couples'>('teens');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'game':
        return <GameBoard gameMode={gameMode} />;
      case 'stories':
        return <StoryFeed />;
      case 'profile':
        return <UserProfile />;
      default:
        return (
          <div className="space-y-12">
            <Hero onStartGame={() => setCurrentView('game')} />
            
            {/* Game Mode Selection */}
            <section className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-game-purple to-game-blue bg-clip-text text-transparent">
                Choose Your Adventure
              </h2>
              <GameModeSelector gameMode={gameMode} onModeChange={setGameMode} />
            </section>

            {/* Stats Overview */}
            <section className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="game-card">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-game-purple" />
                    <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                    <p className="text-muted-foreground">Active Players</p>
                  </CardContent>
                </Card>
                
                <Card className="game-card">
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-2xl font-bold mb-2">10,000+</h3>
                    <p className="text-muted-foreground">Truth & Dare Stories</p>
                  </CardContent>
                </Card>
                
                <Card className="game-card">
                  <CardContent className="p-6 text-center">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-game-pink" />
                    <h3 className="text-2xl font-bold mb-2">1M+</h3>
                    <p className="text-muted-foreground">Likes & Reactions</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Featured Stories Preview */}
            <section className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-game-pink to-game-cyan bg-clip-text text-transparent">
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="game-card hover:scale-105 transition-transform">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-game-purple/20 text-game-purple border-game-purple/30">
                          Truth
                        </Badge>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Heart className="h-4 w-4" />
                          <span>247</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">Epic Truth Revealed!</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        "I once told my crush I was an expert dancer just to impress them, then spent 3 hours on YouTube learning basic moves before our date..."
                      </CardDescription>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-game-purple to-game-blue rounded-full"></div>
                          <span className="text-sm">@truthteller123</span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-game-purple hover:text-game-purple/80">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button 
                  onClick={() => setCurrentView('stories')} 
                  className="glow-button bg-gradient-to-r from-game-purple to-game-blue hover:from-game-purple/80 hover:to-game-blue/80"
                >
                  Explore All Stories
                </Button>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="pt-20">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
