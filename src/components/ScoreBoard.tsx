import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-3"
    >
      <Trophy className="w-6 h-6 text-yellow-500" />
      <div className="text-xl font-bold text-gray-100">
        Score: {score}
      </div>
    </motion.div>
  );
};