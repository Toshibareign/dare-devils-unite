
import { Card, CardContent } from "@/components/ui/card";

export const SpinningLoader = () => {
  return (
    <Card className="game-card text-center">
      <CardContent className="p-8">
        <div className="animate-spin w-16 h-16 bg-gradient-to-r from-game-purple to-game-blue rounded-full mx-auto mb-4"></div>
        <h3 className="text-2xl font-bold mb-2">Spinning...</h3>
        <p className="text-muted-foreground">Preparing your challenge!</p>
      </CardContent>
    </Card>
  );
};
