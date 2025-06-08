
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Send, MessageSquare, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmojiReactions } from "./EmojiReactions";
import { ReplySystem } from "./ReplySystem";

export const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your feedback!",
        description: "Your rating and comments help us improve the experience.",
      });
      setRating(0);
      setFeedback('');
      setIsSubmitting(false);
    }, 1000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (hoveredRating || rating);
      
      return (
        <button
          key={index}
          type="button"
          className={`transition-all duration-200 ${
            isFilled 
              ? 'text-yellow-400 scale-110' 
              : 'text-gray-400 hover:text-yellow-300'
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <Star className="h-8 w-8 fill-current" />
        </button>
      );
    });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-game-purple to-game-pink bg-clip-text text-transparent mb-4">
          Rate Your Experience
        </h2>
        <p className="text-muted-foreground text-lg">
          Help us improve Truth & Dare by sharing your feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Feedback Form */}
        <Card className="game-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-game-purple" />
              Share Your Feedback
            </CardTitle>
            <CardDescription>
              Rate our website and let us know how we can make it better
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Your Rating</Label>
                <div className="flex items-center gap-1">
                  {renderStars()}
                  {rating > 0 && (
                    <span className="ml-3 text-sm text-muted-foreground">
                      {rating} out of 5 stars
                    </span>
                  )}
                </div>
              </div>

              {/* Feedback Text */}
              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-base font-medium">
                  Comments (Optional)
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you loved or what we could improve..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full glow-button bg-gradient-to-r from-game-purple to-game-blue hover:from-game-purple/80 hover:to-game-blue/80"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sample Reviews */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">What Others Are Saying</h3>
          
          {[
            {
              id: "review-1",
              name: "Alex M.",
              rating: 5,
              comment: "Amazing game! Perfect for parties and family gatherings. The different modes are so thoughtful!",
              timeAgo: "2 days ago",
              reactions: [
                { emoji: '👍', count: 12, hasReacted: false },
                { emoji: '❤️', count: 8, hasReacted: false }
              ],
              replies: []
            },
            {
              id: "review-2",
              name: "Sarah K.",
              rating: 4,
              comment: "Love the story feed feature. It's so fun to read what others have shared!",
              timeAgo: "1 week ago",
              reactions: [
                { emoji: '👍', count: 6, hasReacted: true },
                { emoji: '😂', count: 2, hasReacted: false }
              ],
              replies: []
            },
            {
              id: "review-3",
              name: "Mike R.",
              rating: 5,
              comment: "The couples mode is fantastic! Great way to connect with my partner.",
              timeAgo: "3 days ago",
              reactions: [
                { emoji: '❤️', count: 15, hasReacted: false },
                { emoji: '🔥', count: 4, hasReacted: false }
              ],
              replies: []
            }
          ].map((review) => (
            <Card key={review.id} className="game-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-game-purple to-game-blue rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <span className="font-medium">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{review.comment}</p>
                
                {/* Emoji Reactions */}
                <div className="mb-3">
                  <EmojiReactions 
                    itemId={review.id} 
                    initialReactions={review.reactions}
                  />
                </div>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
                  <Button variant="ghost" size="sm" className="text-game-purple hover:text-game-purple/80">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful
                  </Button>
                </div>
                
                {/* Reply System */}
                <div className="mt-3">
                  <ReplySystem 
                    itemId={review.id} 
                    initialReplies={review.replies}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
