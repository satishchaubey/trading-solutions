// components/AnimatedWelcome.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedWelcome() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-shift"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Animated Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Trade Smarter. Grow Faster.
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
        >
          Welcome to <span className="font-semibold">Trading Solutions</span> — 
          your all-in-one platform for real-time market data, AI-powered trading analytics, 
          and secure portfolio management. Whether you trade stocks, forex, or crypto, 
          we help you stay ahead of the market.
        </motion.p>

        {/* Floating Animated Elements */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
        />
      </div>
    </div>
  );
}
