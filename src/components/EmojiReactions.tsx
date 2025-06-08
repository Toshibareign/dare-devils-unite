
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface EmojiReaction {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

interface EmojiReactionsProps {
  itemId: string;
  initialReactions?: EmojiReaction[];
  onReact?: (emoji: string, itemId: string) => void;
}

const defaultEmojis = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

export const EmojiReactions: React.FC<EmojiReactionsProps> = ({
  itemId,
  initialReactions = [],
  onReact
}) => {
  const [reactions, setReactions] = useState<EmojiReaction[]>(
    defaultEmojis.map(emoji => {
      const existing = initialReactions.find(r => r.emoji === emoji);
      return existing || { emoji, count: 0, hasReacted: false };
    })
  );
  const [showAll, setShowAll] = useState(false);

  const handleReact = (emoji: string) => {
    setReactions(prev => prev.map(reaction => {
      if (reaction.emoji === emoji) {
        const newHasReacted = !reaction.hasReacted;
        const newCount = newHasReacted ? reaction.count + 1 : Math.max(0, reaction.count - 1);
        return {
          ...reaction,
          count: newCount,
          hasReacted: newHasReacted
        };
      }
      return reaction;
    }));

    onReact?.(emoji, itemId);
  };

  const visibleReactions = showAll ? reactions : reactions.filter(r => r.count > 0 || r.hasReacted);
  const hasHiddenReactions = reactions.some(r => r.count === 0 && !r.hasReacted);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visibleReactions.map(({ emoji, count, hasReacted }) => (
        <Button
          key={emoji}
          size="sm"
          variant="ghost"
          onClick={() => handleReact(emoji)}
          className={`h-8 px-2 text-sm ${
            hasReacted
              ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
              : 'hover:bg-white/10'
          }`}
        >
          <span className="mr-1">{emoji}</span>
          {count > 0 && <span className="text-xs">{count}</span>}
        </Button>
      ))}
      
      {hasHiddenReactions && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="h-8 px-2 text-xs hover:bg-white/10"
        >
          {showAll ? '−' : '+'}
        </Button>
      )}
    </div>
  );
};
