
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeCustomizer = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="border-white/20 bg-slate-800/50 hover:bg-slate-700/50"
      >
        <Palette className="h-4 w-4 mr-2" />
        Themes
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 z-50 w-80 game-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Customizer
            </CardTitle>
            <CardDescription>
              Choose your preferred color scheme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentTheme.id === theme.id
                    ? 'border-white/40 bg-white/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setTheme(theme.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{theme.name}</span>
                  {currentTheme.id === theme.id && (
                    <Check className="h-4 w-4 text-green-400" />
                  )}
                </div>
                
                <div className="flex gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
                
                <div
                  className="h-8 rounded-md border border-white/20"
                  style={{ background: theme.gradients.hero }}
                />
              </div>
            ))}
            
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="w-full border-white/20"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
