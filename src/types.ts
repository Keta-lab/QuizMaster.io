export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  isCompleted: boolean;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
  isActive: boolean;
  avatarUrl?: string;
}

export interface GameSettings {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  buttonStyle: {
    rounded: 'none' | 'sm' | 'md' | 'lg' | 'full';
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    animation: boolean;
  };
  questionTimer: number;
}

export interface GameState {
  categories: Category[];
  currentQuestion: Question | null;
  players: Player[];
  currentPlayerIndex: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  settings: GameSettings;
  timeRemaining: number | null;
}