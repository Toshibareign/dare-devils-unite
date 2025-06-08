
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Users, Star, User } from "lucide-react";

interface NavigationProps {
  currentView: 'home' | 'game' | 'stories' | 'profile';
  onViewChange: (view: 'home' | 'game' | 'stories' | 'profile') => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'game' as const, label: 'Play Game', icon: Users },
    { id: 'stories' as const, label: 'Stories', icon: Star },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-game-purple to-game-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T&D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-game-purple to-game-blue bg-clip-text text-transparent">
              Truth & Dare
            </span>
            <Badge variant="secondary" className="bg-neon-green/20 text-neon-green border-neon-green/30 text-xs">
              LIVE
            </Badge>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className={`glow-button ${
                    isActive 
                      ? "bg-gradient-to-r from-game-purple to-game-blue" 
                      : "hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  size="sm"
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className={isActive ? "bg-gradient-to-r from-game-purple to-game-blue" : ""}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
