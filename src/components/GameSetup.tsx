import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Save, Trash2, Settings as SettingsIcon } from 'lucide-react';
import type { Category, Player } from '../types';
import { ImageUpload } from './ImageUpload';

interface GameSetupProps {
  onSave: (config: { players: Player[], categories: Category[] }) => void;
  initialCategories: Category[];
  initialPlayers: Player[];
}

export const GameSetup: React.FC<GameSetupProps> = ({ onSave, initialCategories, initialPlayers }) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addPlayer = () => {
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: `Player ${players.length + 1}`,
      score: 0,
      isActive: false,
      avatarUrl: ''
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], name };
    setPlayers(newPlayers);
  };

  const handleImageUpload = async (index: number, file: File) => {
    const url = URL.createObjectURL(file);
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], avatarUrl: url };
    setPlayers(newPlayers);
  };

  const handleImageRemove = (index: number) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], avatarUrl: '' };
    setPlayers(newPlayers);
  };

  const addCategory = () => {
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: `New Category ${categories.length + 1}`,
      questions: Array(6).fill(null).map((_, i) => ({
        id: `question-${Date.now()}-${i}`,
        question: `New Question ${i + 1}`,
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correctAnswer: 0,
        points: i === 5 ? 1000 : (i + 1) * 100,
        isCompleted: false
      }))
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (index: number) => {
    if (categories.length > 1) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  const updateCategory = (index: number, field: string, value: string) => {
    const newCategories = [...categories];
    if (field === 'name') {
      newCategories[index] = { ...newCategories[index], name: value };
    }
    setCategories(newCategories);
  };

  const updateQuestion = (categoryIndex: number, questionIndex: number, field: string, value: string | number) => {
    const newCategories = [...categories];
    const question = { ...newCategories[categoryIndex].questions[questionIndex] };
    
    if (field === 'question') {
      question.question = value as string;
    } else if (field === 'correctAnswer') {
      question.correctAnswer = Number(value);
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.replace('option', ''));
      question.options[optionIndex] = value as string;
    }
    
    newCategories[categoryIndex].questions[questionIndex] = question;
    setCategories(newCategories);
  };

  const handleSave = () => {
    onSave({ players, categories });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl max-w-4xl mx-auto p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Game Setup</h2>
            <SettingsIcon className="w-6 h-6 text-gray-400" />
          </div>

          {/* Players Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Players</h3>
              <button
                onClick={addPlayer}
                className="p-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
          </section>

          {/* Categories Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-200">Categories</h3>
              <button
                onClick={addCategory}
                className="p-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
            {categories.map((category, categoryIndex) => (
              <div key={category.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategory(categoryIndex, 'name', e.target.value)}
                    className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
                  />
                  {categories.length > 1 && (
                    <button
                      onClick={() => removeCategory(categoryIndex)}
                      className="p-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {category.questions.map((question, questionIndex) => (
                    <div key={question.id} className="border-t border-gray-700 pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">
                            {question.points} Points
                          </span>
                        </div>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuestion(categoryIndex, questionIndex, 'question', e.target.value)}
                          className="w-full bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
                          placeholder="Question"
                        />
                        {question.options.map((option, optionIndex) => (
                          <input
                            key={optionIndex}
                            type="text"
                            value={option}
                            onChange={(e) => updateQuestion(categoryIndex, questionIndex, `option${optionIndex}`, e.target.value)}
                            className="w-full bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        ))}
                        <div className="flex items-center space-x-2">
                          <label className="text-gray-300">Correct Answer:</label>
                          <select
                            value={question.correctAnswer}
                            onChange={(e) => updateQuestion(categoryIndex, questionIndex, 'correctAnswer', parseInt(e.target.value))}
                            className="bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
                          >
                            {question.options.map((_, index) => (
                              <option key={index} value={index}>
                                Option {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Save Configuration</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};