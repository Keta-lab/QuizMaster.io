import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface GameBoardProps {
  categories: Category[];
  onQuestionSelect: (categoryId: string, questionIndex: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ categories, onQuestionSelect }) => {
  return (
    <div className="grid grid-cols-6 gap-4 w-full max-w-7xl mx-auto">
      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="h-20 bg-purple-900 rounded-lg flex items-center justify-center p-2 shadow-lg">
            <h3 className="text-purple-100 font-bold text-center text-sm sm:text-base">
              {category.name}
            </h3>
          </div>
          {category.questions.map((question, index) => (
            <motion.button
              key={question.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full h-20 rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg
                ${
                  question.isCompleted
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-700 text-purple-100 hover:bg-purple-600'
                }`}
              onClick={() => !question.isCompleted && onQuestionSelect(category.id, index)}
              disabled={question.isCompleted}
            >
              {question.points}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
};