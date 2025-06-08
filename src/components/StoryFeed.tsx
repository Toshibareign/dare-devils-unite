import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageCircle, Star, Plus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmojiReactions } from "./EmojiReactions";
import { ReplySystem } from "./ReplySystem";

interface Story {
  id: string;
  type: 'truth' | 'dare';
  content: string;
  author: string;
  likes: number;
  comments: number;
  category: string;
  timeAgo: string;
  isLiked: boolean;
  reactions: any[];
  replies: any[];
}

export const StoryFeed = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      type: 'truth',
      content: "I once told my crush I was fluent in French to impress them, then spent the entire date nodding and saying 'oui' to everything they said. Plot twist: they actually spoke French fluently! 😅",
      author: 'truthteller123',
      likes: 247,
      comments: 23,
      category: 'Embarrassing',
      timeAgo: '2 hours ago',
      isLiked: false,
      reactions: [
        { emoji: '😂', count: 15, hasReacted: false },
        { emoji: '😮', count: 8, hasReacted: false }
      ],
      replies: []
    },
    {
      id: '2',
      type: 'dare',
      content: "I had to text my ex 'I still think about you sometimes' as a dare. They replied within 2 minutes asking if I wanted to get coffee. We're dating again now! 💕",
      author: 'brave_heart',
      likes: 892,
      comments: 156,
      category: 'Romance',
      timeAgo: '5 hours ago',
      isLiked: true,
      reactions: [
        { emoji: '❤️', count: 45, hasReacted: true },
        { emoji: '😮', count: 12, hasReacted: false }
      ],
      replies: []
    },
    {
      id: '3',
      type: 'truth',
      content: "The weirdest thing I've ever eaten was a chocolate-covered cricket. It actually wasn't that bad, but I definitely won't be ordering it at restaurants anytime soon!",
      author: 'adventurous_eater',
      likes: 134,
      comments: 67,
      category: 'Food',
      timeAgo: '1 day ago',
      isLiked: false,
      reactions: [
        { emoji: '😮', count: 20, hasReacted: false },
        { emoji: '🔥', count: 5, hasReacted: false }
      ],
      replies: []
    }
  ]);

  const [newStory, setNewStory] = useState('');
  const [storyType, setStoryType] = useState<'truth' | 'dare'>('truth');
  const [storyCategory, setStoryCategory] = useState('');
  const [filter, setFilter] = useState('all');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const { toast } = useToast();

  const toggleLike = (storyId: string) => {
    setStories(prev => prev.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          isLiked: !story.isLiked,
          likes: story.isLiked ? story.likes - 1 : story.likes + 1
        };
      }
      return story;
    }));
  };

  const submitStory = () => {
    if (!newStory.trim() || !storyCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting!",
        variant: "destructive"
      });
      return;
    }

    const story: Story = {
      id: Date.now().toString(),
      type: storyType,
      content: newStory,
      author: 'you',
      likes: 0,
      comments: 0,
      category: storyCategory,
      timeAgo: 'just now',
      isLiked: false,
      reactions: [],
      replies: []
    };

    setStories(prev => [story, ...prev]);
    setNewStory('');
    setStoryCategory('');
    setShowSubmitForm(false);

    toast({
      title: "Story Submitted! 🎉",
      description: "Your story has been added to the community feed!",
    });
  };

  const filteredStories = stories.filter(story => {
    if (filter === 'all') return true;
    return story.type === filter;
  });

  const categories = ['Embarrassing', 'Romance', 'Funny', 'Challenging', 'Food', 'Adventure', 'Family', 'Friends'];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-game-purple to-game-blue bg-clip-text text-transparent">
          Community Stories
        </h1>
        <p className="text-muted-foreground text-lg">
          Share your epic truth and dare moments with the world!
        </p>
      </div>

      {/* Actions and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] bg-slate-800/50 border-white/10">
              <SelectValue placeholder="Filter stories" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/10">
              <SelectItem value="all">All Stories</SelectItem>
              <SelectItem value="truth">Truth Only</SelectItem>
              <SelectItem value="dare">Dare Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => setShowSubmitForm(!showSubmitForm)}
          className="glow-button bg-gradient-to-r from-game-purple to-game-blue hover:from-game-purple/80 hover:to-game-blue/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Share Your Story
        </Button>
      </div>

      {/* Submit Form */}
      {showSubmitForm && (
        <Card className="game-card">
          <CardHeader>
            <CardTitle>Share Your Story</CardTitle>
            <CardDescription>
              Tell the community about your truth or dare experience!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Select value={storyType} onValueChange={(value: 'truth' | 'dare') => setStoryType(value)}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  <SelectItem value="truth">Truth</SelectItem>
                  <SelectItem value="dare">Dare</SelectItem>
                </SelectContent>
              </Select>

              <Select value={storyCategory} onValueChange={setStoryCategory}>
                <SelectTrigger className="flex-1 bg-slate-800/50 border-white/10">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Tell your story... What happened? How did it go? What was the outcome?"
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
              rows={4}
              className="bg-slate-800/50 border-white/10 resize-none"
            />

            <div className="flex gap-4">
              <Button onClick={submitStory} className="flex-1 bg-gradient-to-r from-neon-green to-green-600">
                Submit Story
              </Button>
              <Button onClick={() => setShowSubmitForm(false)} variant="outline" className="border-white/20">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <Card key={story.id} className={`game-card h-fit ${story.type === 'truth' ? 'truth-card' : 'dare-card'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className={story.type === 'truth' 
                    ? 'bg-game-blue/20 text-game-blue border-game-blue/30' 
                    : 'bg-game-pink/20 text-game-pink border-game-pink/30'
                  }
                >
                  {story.type.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                  {story.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-foreground leading-relaxed">
                {story.content}
              </CardDescription>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-game-purple to-game-blue rounded-full"></div>
                  <span>@{story.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{story.timeAgo}</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Emoji Reactions */}
                <EmojiReactions 
                  itemId={story.id} 
                  initialReactions={story.reactions}
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleLike(story.id)}
                    className={`${story.isLiked ? 'text-red-400 hover:text-red-300' : 'text-muted-foreground hover:text-red-400'}`}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${story.isLiked ? 'fill-current' : ''}`} />
                    {story.likes}
                  </Button>
                  
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-blue-400">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {story.comments}
                  </Button>
                  
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-yellow-400">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>

                {/* Reply System */}
                <ReplySystem 
                  itemId={story.id} 
                  initialReplies={story.replies}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <Card className="game-card text-center">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-2">No Stories Found</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to share a story in this category!
            </p>
            <Button 
              onClick={() => setShowSubmitForm(true)}
              className="bg-gradient-to-r from-game-purple to-game-blue"
            >
              Share Your Story
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
