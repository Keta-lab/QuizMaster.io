import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center space-x-2 text-xl font-bold">
      <Clock className={`w-6 h-6 ${timeRemaining <= 10 ? 'text-red-500' : 'text-gray-300'}`} />
      <span className={timeRemaining <= 10 ? 'text-red-500' : 'text-gray-300'}>
        {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
      </span>
    </div>
  );
};