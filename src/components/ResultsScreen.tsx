import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="mb-8">
        <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
      <p className="text-xl text-gray-600 mb-6">
        You scored {score} out of {totalQuestions} ({Math.round(percentage)}%)
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Play Again
      </motion.button>
    </motion.div>
  );
};