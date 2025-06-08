
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { EmojiReactions } from './EmojiReactions';

interface Reply {
  id: string;
  content: string;
  author: string;
  timeAgo: string;
  reactions: any[];
}

interface ReplySystemProps {
  itemId: string;
  initialReplies?: Reply[];
  onAddReply?: (content: string, itemId: string) => void;
}

export const ReplySystem: React.FC<ReplySystemProps> = ({
  itemId,
  initialReplies = [],
  onAddReply
}) => {
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleAddReply = () => {
    if (!newReply.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      content: newReply,
      author: 'you',
      timeAgo: 'just now',
      reactions: []
    };

    setReplies(prev => [...prev, reply]);
    setNewReply('');
    setShowReplyForm(false);
    setShowReplies(true);
    onAddReply?.(newReply, itemId);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowReplies(!showReplies)}
          className="text-muted-foreground hover:text-blue-400"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          {replies.length > 0 ? `${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}` : 'Reply'}
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-muted-foreground hover:text-blue-400"
        >
          Reply
        </Button>
      </div>

      {showReplyForm && (
        <Card className="game-card">
          <CardContent className="p-4 space-y-3">
            <Textarea
              placeholder="Write your reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={3}
              className="bg-slate-800/50 border-white/10 resize-none"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAddReply}
                size="sm"
                className="bg-gradient-to-r from-game-purple to-game-blue"
              >
                <Send className="h-3 w-3 mr-1" />
                Reply
              </Button>
              <Button
                onClick={() => setShowReplyForm(false)}
                size="sm"
                variant="outline"
                className="border-white/20"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showReplies && replies.length > 0 && (
        <div className="space-y-3 pl-4 border-l border-white/10">
          {replies.map((reply) => (
            <Card key={reply.id} className="game-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-game-purple to-game-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {reply.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">@{reply.author}</span>
                  <span className="text-xs text-muted-foreground">• {reply.timeAgo}</span>
                </div>
                
                <p className="text-sm text-foreground mb-3">{reply.content}</p>
                
                <EmojiReactions itemId={reply.id} initialReactions={reply.reactions} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
