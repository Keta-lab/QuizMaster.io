import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import type { Player } from '../types';

interface PlayerSetupProps {
  players: Player[];
  onUpdate: (players: Player[]) => void;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ players, onUpdate }) => {
  const handleImageUpload = async (index: number, file: File) => {
    const url = URL.createObjectURL(file);
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], avatarUrl: url };
    onUpdate(newPlayers);
  };

  const handleImageRemove = (index: number) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], avatarUrl: undefined };
    onUpdate(newPlayers);
  };

  const addPlayer = () => {
    onUpdate([
      ...players,
      {
        id: `player-${players.length + 1}`,
        name: `Player ${players.length + 1}`,
        score: 0,
        isActive: false,
      },
    ]);
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      onUpdate(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name };
    onUpdate(newPlayers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-200">Players</h3>
        <button
          onClick={addPlayer}
          className="p-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center space-x-4">
            <ImageUpload
              imageUrl={player.avatarUrl}
              onImageUpload={(file) => handleImageUpload(index, file)}
              onImageRemove={() => handleImageRemove(index)}
              className="w-20 h-20"
            />
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={player.name}
                onChange={(e) => updatePlayerName(index, e.target.value)}
                className="w-full bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
                placeholder="Player Name"
              />
              {players.length > 2 && (
                <button
                  onClick={() => removePlayer(index)}
                  className="w-full p-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
                >
                  <Minus className="w-5 h-5 text-white mx-auto" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};