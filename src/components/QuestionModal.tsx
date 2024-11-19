import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import { Timer } from './Timer';
import { Question, Player } from '../types';

interface QuestionModalProps {
  question: Question;
  onAnswer: (index: number) => void;
  selectedAnswer: number | null;
  isAnswered: boolean;
  currentPlayer: Player;
  timeRemaining: number | null;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  onAnswer,
  selectedAnswer,
  isAnswered,
  currentPlayer,
  timeRemaining,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full relative shadow-2xl"
      >
        <div className="absolute right-4 top-4">
          {timeRemaining !== null && !isAnswered && (
            <Timer timeRemaining={timeRemaining} onTimeUp={() => onAnswer(-1)} />
          )}
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              {currentPlayer.avatarUrl ? (
                <img
                  src={currentPlayer.avatarUrl}
                  alt={currentPlayer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
              <span className="text-xl font-bold text-purple-400">
                {currentPlayer.name}
              </span>
            </div>
            <div className="text-purple-400 font-semibold">
              {question.points} Points
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">
            {question.question}
          </h2>
          {question.imageUrl && (
            <img
              src={question.imageUrl}
              alt="Question"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isAnswered && onAnswer(index)}
              className={`w-full p-4 text-left rounded-lg transition-all ${
                isAnswered
                  ? index === question.correctAnswer
                    ? 'bg-green-900 border-green-500 text-green-100'
                    : index === selectedAnswer
                    ? 'bg-red-900 border-red-500 text-red-100'
                    : 'bg-gray-700 border-gray-600 text-gray-300'
                  : selectedAnswer === index
                  ? 'bg-purple-700 border-purple-500 text-purple-100'
                  : 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300'
              } border-2`}
            >
              <span className="font-medium">{option}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};