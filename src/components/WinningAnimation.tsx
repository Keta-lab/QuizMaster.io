import React from 'react';
import { motion } from 'framer-motion';

interface WinningAnimationProps {
  points: number;
}

export const WinningAnimation: React.FC<WinningAnimationProps> = ({ points }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, y: 100 }}
        animate={{
          scale: [0.5, 1.2, 1],
          y: [100, -20, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative"
      >
        <div className="text-6xl font-bold text-purple-400 text-center">
          +{points}
        </div>
        <motion.div
          animate={{
            scale: [1, 1.5],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            times: [0, 1],
            repeat: 0,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0, 1.5],
                opacity: [1, 0],
                x: [0, Math.cos(i * (Math.PI / 4)) * 100],
                y: [0, Math.sin(i * (Math.PI / 4)) * 100],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="absolute w-4 h-4 bg-purple-500 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};