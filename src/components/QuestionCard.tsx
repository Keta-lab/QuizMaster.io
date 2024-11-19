import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  isAnswered: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnswered,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !isAnswered && onSelectAnswer(index)}
            className={`w-full p-4 text-left rounded-lg transition-all ${
              isAnswered
                ? index === question.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : index === selectedAnswer
                  ? 'bg-red-100 border-red-500 text-red-700'
                  : 'bg-white border-gray-200 text-gray-700'
                : selectedAnswer === index
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
            } border-2`}
          >
            <span className="font-medium">{option}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};