"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Coins, Trophy, Star, Zap, Crown, Gem, Target } from "lucide-react";

interface Prize {
  id: number;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

const prizes: Prize[] = [
  { id: 1, label: "Bonus 9", icon: Gift, color: "text-yellow-100" },
  { id: 2, label: "Bonus 6", icon: Coins, color: "text-amber-100" },
  { id: 3, label: "Bonus 3", icon: Trophy, color: "text-orange-100" },
  { id: 4, label: "Bonus 12", icon: Star, color: "text-red-100" },
  { id: 5, label: "Bonus 15", icon: Zap, color: "text-pink-100" },
  { id: 6, label: "Bonus 18", icon: Crown, color: "text-purple-100" },
  { id: 7, label: "Bonus 21", icon: Gem, color: "text-blue-100" },
  { id: 8, label: "Bonus 24", icon: Target, color: "text-cyan-100" }
];

export const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<Prize | null>(null);

  const segmentAngle = 360 / prizes.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Calculate random final rotation (multiple full rotations + random segment)
    const randomSpins = 5 + Math.random() * 5; // 5-10 full rotations
    const randomSegment = Math.random() * 360;
    const finalRotation = rotation + randomSpins * 360 + randomSegment;

    setRotation(finalRotation);

    // Determine winner based on final position
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const winningIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % prizes.length;
      setWinner(prizes[winningIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8  justify-center" suppressHydrationWarning>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Wheel Container */}
      <div className="relative z-10">
        {/* Wheel Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg"></div>
        </div>

        {/* Outer Ring */}
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full animate-pulse opacity-80 blur-sm"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 rounded-full"></div>

        {/* Main Wheel */}
        <motion.div
          className="relative w-80 h-80 rounded-full border-8 border-yellow-400 shadow-2xl"
          style={{
            background: "conic-gradient(from 0deg, #FFD700 0deg 45deg, #FFA500 45deg 90deg, #FF6B6B 90deg 135deg, #FF8EDF 135deg 180deg, #9370DB 180deg 225deg, #4FC3F7 225deg 270deg, #4DD0E1 270deg 315deg, #36D7B7 315deg 360deg)",
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)"
          }}
          animate={{ rotate: rotation }}
          transition={{
            duration: isSpinning ? 4 : 0,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {/* Wheel Segments - Improved positioning */}
          {prizes.map((prize, index) => {
            const angle = (index * segmentAngle) * (Math.PI / 180);
            const radius = 120; // Increased radius for better positioning
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={prize.id}
                className="absolute w-14 h-14 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/30">
                  <prize.icon className="w-7 h-7 text-white drop-shadow-md" />
                </div>
                <span className="text-xs font-bold text-white mt-1 whitespace-nowrap drop-shadow-md">
                  {prize.label}
                </span>
              </div>
            );
          })}

          {/* Pattern overlay */}
          <div className="absolute inset-0 rounded-full bg-radial-gradient(at center, rgba(255,255,255,0.1) 0%, transparent 70%)"></div>

          {/* Center Button */}
          <motion.button
            onClick={spinWheel}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-white font-bold text-xl shadow-2xl border-4 border-yellow-200 z-20 hover:scale-105 transition-transform disabled:cursor-not-allowed"
            style={{ 
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.8), inset 0 4px 10px rgba(255, 255, 255, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            animate={isSpinning ? { 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 30px rgba(255, 215, 0, 0.8)",
                "0 0 50px rgba(255, 215, 0, 0.9)",
                "0 0 30px rgba(255, 215, 0, 0.8)"
              ]
            } : {}}
            transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
          >
            {isSpinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Zap className="w-10 h-10 text-white drop-shadow-md" />
              </motion.div>
            ) : (
              <span className="drop-shadow-md">SPIN</span>
            )}
          </motion.button>
        </motion.div>

        {/* Decorative dots around wheel */}
        <div className="absolute inset-0 -m-6">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg"
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(-50%, -50%) rotate(${i * 15}deg) translateY(-170px)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Wheel Label */}
      <motion.div 
        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl border-2 border-yellow-300"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🎡 WHEEL OF FORTUNE 🎡
      </motion.div>

      {/* Winner Display */}
      {winner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-2xl shadow-2xl text-center border-2 border-purple-400 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="font-bold text-2xl text-yellow-300 drop-shadow-md">Congratulations!</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/10 py-3 px-6 rounded-xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <winner.icon className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-lg text-yellow-200 drop-shadow-md">
              You won: {winner.label}
            </span>
          </div>
          <div className="mt-4 text-yellow-100 text-sm">
            🎉 Your prize is waiting for you! 🎉
          </div>
        </motion.div>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};