import React from 'react';
import { ImageUpload } from './ImageUpload';
import type { Question } from '../types';

interface QuestionEditorProps {
  question: Question;
  onChange: (updatedQuestion: Question) => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onChange }) => {
  const handleImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    onChange({ ...question, imageUrl: url });
  };

  const handleImageRemove = () => {
    onChange({ ...question, imageUrl: undefined });
  };

  return (
    <div className="space-y-4 border-t border-gray-700 pt-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">
          {question.points} Points
        </span>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={question.question}
          onChange={(e) => onChange({ ...question, question: e.target.value })}
          className="w-full bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
          placeholder="Question"
        />

        <ImageUpload
          imageUrl={question.imageUrl}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          className="w-full h-48"
        />

        {question.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...question.options];
              newOptions[index] = e.target.value;
              onChange({ ...question, options: newOptions });
            }}
            className="w-full bg-gray-700 text-gray-100 rounded-lg px-3 py-2"
            placeholder={`Option ${index + 1}`}
          />
        ))}

        <div className="flex items-center space-x-2">
          <label className="text-gray-300">Correct Answer:</label>
          <select
            value={question.correctAnswer}
            onChange={(e) => onChange({ ...question, correctAnswer: parseInt(e.target.value) })}
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
  );
};