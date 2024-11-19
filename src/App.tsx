import React, { useState } from 'react';
import { categories as initialCategories } from './data/categories';
import { GameBoard } from './components/GameBoard';
import { QuestionModal } from './components/QuestionModal';
import { PlayerScoreBoard } from './components/PlayerScoreBoard';
import { WinningAnimation } from './components/WinningAnimation';
import { LosingAnimation } from './components/LosingAnimation';
import { GameSetup } from './components/GameSetup';
import { ThemeSettings } from './components/ThemeSettings';
import { Settings, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameState, Player, Category, GameSettings } from './types';

function App() {
  const [showSetup, setShowSetup] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    categories: initialCategories,
    currentQuestion: null,
    players: [
      {
        id: 'player-1',
        name: 'Player 1',
        score: 0,
        isActive: true,
        avatarUrl: ''
      },
      {
        id: 'player-2',
        name: 'Player 2',
        score: 0,
        isActive: false,
        avatarUrl: ''
      }
    ],
    currentPlayerIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    settings: {
      theme: {
        primary: '#6B46C1',
        secondary: '#4A5568',
        accent: '#ED64A6',
        background: '#1A202C',
        text: '#FFFFFF'
      },
      buttonStyle: {
        rounded: 'lg',
        shadow: 'md',
        animation: true
      },
      questionTimer: 60
    },
    timeRemaining: null
  });

  const handleQuestionSelect = (categoryId: string, questionIndex: number) => {
    const category = gameState.categories.find((c) => c.id === categoryId);
    if (category) {
      setGameState((prev) => ({
        ...prev,
        currentQuestion: category.questions[questionIndex],
        selectedAnswer: null,
        isAnswered: false,
        timeRemaining: prev.settings.questionTimer
      }));
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!gameState.currentQuestion || gameState.isAnswered) return;

    const isCorrect = answerIndex === gameState.currentQuestion.correctAnswer;
    const points = gameState.currentQuestion.points;
    
    setGameState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      players: prev.players.map((player, index) =>
        index === prev.currentPlayerIndex
          ? {
              ...player,
              score: player.score + (isCorrect ? points : -points),
            }
          : player
      ),
    }));

    setLastPoints(points);
    if (isCorrect) {
      setShowWinAnimation(true);
      setTimeout(() => setShowWinAnimation(false), 1500);
    } else {
      setShowLoseAnimation(true);
      setTimeout(() => setShowLoseAnimation(false), 1500);
    }

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        categories: prev.categories.map((category) => ({
          ...category,
          questions: category.questions.map((question) =>
            question.id === prev.currentQuestion?.id
              ? { ...question, isCompleted: true }
              : question
          ),
        })),
        currentQuestion: null,
        selectedAnswer: null,
        isAnswered: false,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
        timeRemaining: null
      }));
    }, 2000);
  };

  const handleGameSetup = (config: { players: Player[], categories: Category[] }) => {
    setGameState((prev) => ({
      ...prev,
      categories: config.categories,
      players: config.players,
      currentPlayerIndex: 0,
      currentQuestion: null,
      selectedAnswer: null,
      isAnswered: false,
      timeRemaining: null
    }));
    setShowSetup(false);
  };

  const handleThemeUpdate = (newSettings: GameSettings) => {
    setGameState(prev => ({
      ...prev,
      settings: newSettings
    }));
    document.documentElement.style.setProperty('--primary-color', newSettings.theme.primary);
    document.documentElement.style.setProperty('--secondary-color', newSettings.theme.secondary);
    document.documentElement.style.setProperty('--accent-color', newSettings.theme.accent);
    document.documentElement.style.setProperty('--background-color', newSettings.theme.background);
    document.documentElement.style.setProperty('--text-color', newSettings.theme.text);
    setShowThemeSettings(false);
  };

  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const [showLoseAnimation, setShowLoseAnimation] = useState(false);
  const [lastPoints, setLastPoints] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-100">Quiz Master</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowSetup(true)}
              className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              <Settings className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setShowThemeSettings(true)}
              className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              <Palette className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <PlayerScoreBoard
          players={gameState.players}
          currentPlayerIndex={gameState.currentPlayerIndex}
        />

        <GameBoard
          categories={gameState.categories}
          onQuestionSelect={handleQuestionSelect}
        />

        <AnimatePresence>
          {gameState.currentQuestion && (
            <QuestionModal
              question={gameState.currentQuestion}
              onAnswer={handleAnswerSelect}
              selectedAnswer={gameState.selectedAnswer}
              isAnswered={gameState.isAnswered}
              currentPlayer={gameState.players[gameState.currentPlayerIndex]}
              timeRemaining={gameState.timeRemaining}
            />
          )}
          {showWinAnimation && (
            <WinningAnimation 
              key="win-animation"
              points={lastPoints} 
            />
          )}
          {showLoseAnimation && (
            <LosingAnimation 
              key="lose-animation"
              points={lastPoints} 
            />
          )}
          {showSetup && (
            <GameSetup
              key="game-setup"
              onSave={handleGameSetup}
              initialCategories={gameState.categories}
              initialPlayers={gameState.players}
            />
          )}
          {showThemeSettings && (
            <ThemeSettings
              key="theme-settings"
              settings={gameState.settings}
              onUpdate={handleThemeUpdate}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;