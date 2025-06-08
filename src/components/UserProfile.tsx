
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, Users, Clock, ArrowUp, Trophy, Target, Zap } from "lucide-react";

export const UserProfile = () => {
  const [userStats] = useState({
    username: 'truthseeker2024',
    level: 15,
    totalPoints: 2450,
    pointsToNextLevel: 550,
    truthsCompleted: 127,
    daresCompleted: 89,
    storiesShared: 23,
    storiesLiked: 1247,
    currentStreak: 7,
    longestStreak: 15,
    joinDate: 'January 2024',
    rank: 'Truth Warrior'
  });

  const achievements = [
    { id: 1, name: 'First Truth', description: 'Complete your first truth', icon: Star, unlocked: true },
    { id: 2, name: 'Dare Devil', description: 'Complete 50 dares', icon: Heart, unlocked: true },
    { id: 3, name: 'Storyteller', description: 'Share 10 stories', icon: Users, unlocked: true },
    { id: 4, name: 'Popular', description: 'Get 100 likes on stories', icon: ArrowUp, unlocked: true },
    { id: 5, name: 'Streak Master', description: 'Maintain 10-day streak', icon: Zap, unlocked: true },
    { id: 6, name: 'Truth Legend', description: 'Complete 100 truths', icon: Trophy, unlocked: true },
    { id: 7, name: 'Community Favorite', description: 'Get 1000 total likes', icon: Target, unlocked: false },
    { id: 8, name: 'Ultimate Challenger', description: 'Complete 500 total challenges', icon: Trophy, unlocked: false }
  ];

  const recentStories = [
    {
      id: 1,
      type: 'truth',
      content: "I once pretended to be sick to skip work and go to a concert, but ended up actually getting sick at the concert!",
      likes: 156,
      timeAgo: '2 days ago'
    },
    {
      id: 2,
      type: 'dare',
      content: "Had to sing karaoke in a crowded mall. Ended up with a small crowd cheering me on!",
      likes: 89,
      timeAgo: '1 week ago'
    },
    {
      id: 3,
      type: 'truth',
      content: "The most embarrassing thing I've done is wave back at someone who was waving at the person behind me. Twice.",
      likes: 203,
      timeAgo: '2 weeks ago'
    }
  ];

  const levelProgress = (userStats.totalPoints % 1000) / 10;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <Card className="game-card">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-game-purple to-game-blue">
                {userStats.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{userStats.username}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                  <Badge className="bg-gradient-to-r from-game-purple to-game-blue">
                    Level {userStats.level}
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                    {userStats.rank}
                  </Badge>
                  <Badge variant="secondary" className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    {userStats.currentStreak} Day Streak 🔥
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {userStats.level + 1}</span>
                  <span>{userStats.pointsToNextLevel} points to go</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="game-card truth-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-game-blue">{userStats.truthsCompleted}</div>
            <div className="text-sm text-muted-foreground">Truths Completed</div>
          </CardContent>
        </Card>
        
        <Card className="game-card dare-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-game-pink">{userStats.daresCompleted}</div>
            <div className="text-sm text-muted-foreground">Dares Completed</div>
          </CardContent>
        </Card>
        
        <Card className="game-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-green">{userStats.storiesShared}</div>
            <div className="text-sm text-muted-foreground">Stories Shared</div>
          </CardContent>
        </Card>
        
        <Card className="game-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{userStats.storiesLiked}</div>
            <div className="text-sm text-muted-foreground">Total Likes</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Content */}
      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="stories">My Stories</TabsTrigger>
          <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="game-card">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your gaming milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border-yellow-400/30'
                          : 'bg-slate-800/30 border-slate-700/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                            : 'bg-slate-600'
                        }`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <Card className="game-card">
            <CardHeader>
              <CardTitle>My Stories</CardTitle>
              <CardDescription>Stories you've shared with the community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentStories.map((story) => (
                <div key={story.id} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="secondary" 
                          className={story.type === 'truth' 
                            ? 'bg-game-blue/20 text-game-blue border-game-blue/30' 
                            : 'bg-game-pink/20 text-game-pink border-game-pink/30'
                          }
                        >
                          {story.type.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{story.timeAgo}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{story.content}</p>
                    </div>
                    <div className="flex items-center gap-1 text-red-400">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm">{story.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="game-card">
              <CardHeader>
                <CardTitle>Gaming Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Points</span>
                  <span className="font-bold text-neon-green">{userStats.totalPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Level</span>
                  <span className="font-bold text-game-purple">{userStats.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Streak</span>
                  <span className="font-bold text-yellow-400">{userStats.currentStreak} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Longest Streak</span>
                  <span className="font-bold text-orange-400">{userStats.longestStreak} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Since</span>
                  <span className="font-bold">{userStats.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="game-card">
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Stories Shared</span>
                  <span className="font-bold text-game-blue">{userStats.storiesShared}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Likes Received</span>
                  <span className="font-bold text-red-400">{userStats.storiesLiked}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Likes per Story</span>
                  <span className="font-bold text-yellow-400">
                    {Math.round(userStats.storiesLiked / userStats.storiesShared)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Truth/Dare Ratio</span>
                  <span className="font-bold text-game-purple">
                    {Math.round((userStats.truthsCompleted / (userStats.truthsCompleted + userStats.daresCompleted)) * 100)}% Truth
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
