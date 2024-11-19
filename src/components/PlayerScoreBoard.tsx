import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Player } from '../types';

interface PlayerScoreBoardProps {
  players: Player[];
  currentPlayerIndex: number;
}

export const PlayerScoreBoard: React.FC<PlayerScoreBoardProps> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {players.map((player, index) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${
            index === currentPlayerIndex
              ? 'bg-purple-900 ring-2 ring-purple-400'
              : 'bg-gray-800'
          } rounded-lg shadow-lg p-4 flex flex-col items-center space-y-2`}
        >
          <div className="relative">
            {player.avatarUrl ? (
              <img
                src={player.avatarUrl}
                alt={player.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User
                className={`w-8 h-8 ${
                  index === currentPlayerIndex ? 'text-purple-200' : 'text-gray-400'
                }`}
              />
            )}
            {index === currentPlayerIndex && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full"
              />
            )}
          </div>
          <div
            className={`text-sm font-medium ${
              index === currentPlayerIndex ? 'text-purple-200' : 'text-gray-300'
            }`}
          >
            {player.name}
          </div>
          <div
            className={`text-xl font-bold ${
              index === currentPlayerIndex ? 'text-purple-100' : 'text-gray-100'
            }`}
          >
            {player.score}
          </div>
        </motion.div>
      ))}
    </div>
  );
};