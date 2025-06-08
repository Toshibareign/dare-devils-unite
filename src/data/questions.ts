
import { Question, GameMode } from '@/types/game';

export const questions: Record<GameMode, Question[]> = {
  kids: [
    { id: '1', type: 'truth', text: 'What is your favorite cartoon character and why?', difficulty: 'easy', category: 'fun' },
    { id: '2', type: 'dare', text: 'Do your best superhero pose for 10 seconds!', difficulty: 'easy', category: 'silly' },
    { id: '3', type: 'truth', text: 'What is the silliest thing you believed when you were younger?', difficulty: 'medium', category: 'memories' },
    { id: '4', type: 'dare', text: 'Sing your favorite song in a funny voice!', difficulty: 'medium', category: 'performance' }
  ],
  teens: [
    { id: '1', type: 'truth', text: 'Who was your first crush and do you still think about them?', difficulty: 'medium', category: 'romance' },
    { id: '2', type: 'dare', text: 'Text your parents "I love you" right now!', difficulty: 'easy', category: 'family' },
    { id: '3', type: 'truth', text: 'What is the most embarrassing thing that happened to you at school?', difficulty: 'hard', category: 'embarrassing' },
    { id: '4', type: 'dare', text: 'Do 20 push-ups or jumping jacks!', difficulty: 'medium', category: 'physical' }
  ],
  adults: [
    { id: '1', type: 'truth', text: 'What is a life lesson you learned the hard way that you wish you could share with your younger self?', difficulty: 'medium', category: 'wisdom' },
    { id: '2', type: 'dare', text: 'Share a skill or talent you have that most people don\'t know about by demonstrating it!', difficulty: 'medium', category: 'talent' },
    { id: '3', type: 'truth', text: 'What is a professional goal you\'re working toward that excites and terrifies you at the same time?', difficulty: 'hard', category: 'career' },
    { id: '4', type: 'dare', text: 'Call or text someone you admire professionally and tell them how they\'ve influenced your career!', difficulty: 'hard', category: 'networking' },
    { id: '5', type: 'truth', text: 'What is a personal habit or mindset you\'ve changed that has significantly improved your quality of life?', difficulty: 'medium', category: 'growth' },
    { id: '6', type: 'dare', text: 'Share your most embarrassing adult moment in a funny, storytelling way!', difficulty: 'medium', category: 'storytelling' },
    { id: '7', type: 'truth', text: 'What is something you believed about adulthood as a child that turned out to be completely wrong?', difficulty: 'easy', category: 'perspective' },
    { id: '8', type: 'dare', text: 'Give everyone present a genuine, specific compliment about their character or achievements!', difficulty: 'easy', category: 'appreciation' },
    { id: '9', type: 'truth', text: 'What is a decision you made that seemed small at the time but ended up changing your life trajectory?', difficulty: 'hard', category: 'reflection' },
    { id: '10', type: 'dare', text: 'Teach everyone a practical life skill you\'ve mastered in under 3 minutes!', difficulty: 'medium', category: 'education' }
  ],
  couples: [
    { id: '1', type: 'truth', text: 'What was your first impression of me when we met?', difficulty: 'medium', category: 'relationship' },
    { id: '2', type: 'dare', text: 'Give your partner a 30-second massage!', difficulty: 'easy', category: 'romantic' },
    { id: '3', type: 'truth', text: 'What is one thing you wish I did more often?', difficulty: 'hard', category: 'relationship' },
    { id: '4', type: 'dare', text: 'Write a love poem about your partner in 2 minutes!', difficulty: 'hard', category: 'creative' }
  ]
};
