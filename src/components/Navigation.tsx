
import { Button } from "@/components/ui/button";
import { Home, Gamepad2, BookOpen, User } from "lucide-react";
import { ThemeCustomizer } from "./ThemeCustomizer";

interface NavigationProps {
  currentView: 'home' | 'game' | 'stories' | 'profile';
  onViewChange: (view: 'home' | 'game' | 'stories' | 'profile') => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'game' as const, label: 'Play Game', icon: Gamepad2 },
    { id: 'stories' as const, label: 'Stories', icon: BookOpen },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-game-purple to-game-blue bg-clip-text text-transparent">
              Truth & Dare
            </h1>
            
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={currentView === id ? "default" : "ghost"}
                  onClick={() => onViewChange(id)}
                  className={`${
                    currentView === id
                      ? 'bg-gradient-to-r from-game-purple to-game-blue text-white'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeCustomizer />
          </div>
        </div>
      </div>
    </nav>
  );
};
