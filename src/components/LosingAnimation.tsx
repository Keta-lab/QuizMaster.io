import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface LosingAnimationProps {
  points: number;
}

export const LosingAnimation: React.FC<LosingAnimationProps> = ({ points }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 1.2, y: -20 }}
        animate={{
          scale: [1.2, 1],
          y: [-20, 0],
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative"
      >
        <div className="flex items-center space-x-3">
          <XCircle className="w-12 h-12 text-red-500" />
          <div className="text-6xl font-bold text-red-500 text-center">
            -{points}
          </div>
        </div>
        <motion.div
          animate={{
            scale: [1, 1.5],
            opacity: [1, 0],
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [1, 0],
                x: [0, Math.cos(i * (Math.PI / 2)) * 50],
                y: [0, Math.sin(i * (Math.PI / 2)) * 50],
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};