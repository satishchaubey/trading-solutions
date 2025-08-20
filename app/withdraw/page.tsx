"use client";

import { WinningTable } from "@/components/comman/Table";
import { Wheel } from "@/components/Withdraw/Wheel";
import { motion } from "framer-motion";

export default function WithdrawPage() {


  const userWinningData = [
    { id: 1, prize: "Bonus 9", date: "2025-08-19" },
    { id: 2, prize: "Bonus 15", date: "2025-08-20" },
  ];

  return (
    <div className="min-h-screen bg-yellow-200 flex flex-col items-center py-6">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white text-center py-3 font-semibold flex justify-between items-center px-4">
        <button className="text-xl">←</button>
        <span>Withdraw draw</span>
        <button className="text-sm underline">lottery record</button>
      </header>

      {/* Draw count */}
      <div className="mt-6 w-11/12 md:w-2/3 bg-green-500 text-white rounded-full py-2 text-center font-medium">
        🪙 My number of draws <span className="ml-1">0.00</span>
      </div>

      {/* Wheel Section */}
      <div className="mt-10 w-full max-w-2xl bg-yellow-200 rounded-lg shadow-lg p-6">
        <Wheel />
      </div>

      {/* Winning record */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 bg-indigo-500 text-white px-6 py-2 rounded-t-lg shadow-md"
      >
        winning record
      </motion.div>
      <div className=" min-w-full">
        <WinningTable records={userWinningData} />
      </div>
    </div>
  );
}
