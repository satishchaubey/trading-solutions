"use client";

import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface WinnerModalProps {
  open: boolean;
  onClose: () => void;
  prize: {
    label: string;
    icon: React.ComponentType<any>;
  } | null;
}

export function WinnerModal({ open, onClose, prize }: WinnerModalProps) {
  if (!prize) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-gradient-to-br from-purple-700 to-pink-700 text-white border border-purple-400 shadow-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="flex flex-col items-center space-y-3">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Trophy className="w-8 h-8 text-white" />
            </motion.div>
            <span className="font-bold text-2xl text-yellow-300 drop-shadow-md">
              Congratulations!
            </span>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex items-center space-x-3 bg-white/10 py-3 px-6 rounded-xl backdrop-blur-sm">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <prize.icon className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-lg text-yellow-200">
              You won: {prize.label}
            </span>
          </div>
          <div className="text-yellow-100 text-sm text-center">
            🎉 Your prize is waiting! 🎉
          </div>
        </motion.div>

        <DialogFooter className="mt-6 flex justify-center">
          <Button
            onClick={onClose}
            className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold rounded-lg px-6 py-2"
          >
            Claim Prize
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
