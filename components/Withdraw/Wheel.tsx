"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Coins, Trophy, Star, Zap, Crown, Gem, Target } from "lucide-react";
import { WinnerModal } from "./WinnerModal";

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
  { id: 8, label: "Bonus 24", icon: Target, color: "text-cyan-100" },
];

export const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<Prize | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const segmentAngle = 360 / prizes.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    setModalOpen(false);

    const randomSpins = 5 + Math.random() * 5; // 5–10 rotations
    const randomSegment = Math.random() * 360;
    const finalRotation = rotation + randomSpins * 360 + randomSegment;

    setRotation(finalRotation);

    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const winningIndex =
        Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) %
        prizes.length;

      const selectedPrize = prizes[winningIndex];
      setWinner(selectedPrize);
      setIsSpinning(false);
      setModalOpen(true); // ✅ now modal will show
    }, 4000);
  };

  return (
    <div
      className="flex flex-col items-center space-y-4 md:space-y-6 p-4 md:p-8 justify-center"
      suppressHydrationWarning
    >
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-full blur-2xl md:blur-3xl" />
      </div>

      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-6 md:border-l-8 border-r-6 md:border-r-8 border-b-10 md:border-b-12 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-6 md:border-8 border-yellow-400 shadow-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, #FFD700 0deg 45deg, #FFA500 45deg 90deg, #FF6B6B 90deg 135deg, #FF8EDF 135deg 180deg, #9370DB 180deg 225deg, #4FC3F7 225deg 270deg, #4DD0E1 270deg 315deg, #36D7B7 315deg 360deg)",
            boxShadow:
              "0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)",
          }}
          animate={{ rotate: rotation }}
          transition={{
            duration: isSpinning ? 4 : 0,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {/* Prize Items */}
          {prizes.map((prize, index) => {
            const angle = (index * segmentAngle * Math.PI) / 180;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={prize.id}
                className="absolute w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-1.5 md:p-2 shadow-lg border border-white/30">
                  <prize.icon className="w-5 h-5 md:w-7 md:h-7 text-white drop-shadow-md" />
                </div>
                <span className="text-[10px] md:text-xs font-bold text-white mt-0.5 md:mt-1 whitespace-nowrap drop-shadow-md">
                  {prize.label}
                </span>
              </div>
            );
          })}

          {/* Spin Button */}
          <motion.button
            onClick={spinWheel}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full text-white font-bold text-lg md:text-xl shadow-2xl border-3 md:border-4 border-yellow-200 z-20 hover:scale-105 transition-transform disabled:cursor-not-allowed"
            style={{
              boxShadow:
                "0 0 20px rgba(255, 215, 0, 0.8), inset 0 3px 8px rgba(255, 255, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={
              isSpinning
                ? {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.8)",
                      "0 0 40px rgba(255, 215, 0, 0.9)",
                      "0 0 20px rgba(255, 215, 0, 0.8)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
          >
            {isSpinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Zap className="w-6 h-6 md:w-10 md:h-10 text-white drop-shadow-md" />
              </motion.div>
            ) : (
              <span className="drop-shadow-md text-sm md:text-base">SPIN</span>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Label */}
      <motion.div
        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl shadow-xl md:shadow-2xl border-2 border-yellow-300 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="hidden md:inline">🎡 WHEEL OF FORTUNE 🎡</span>
        <span className="md:hidden">🎡 WHEEL 🎡</span>
      </motion.div>

      {/* Winner Modal */}
      {winner && (
        <WinnerModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setWinner(null);
          }}
          prize={winner}
        />
      )}
    </div>
  );
};
