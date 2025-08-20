import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface CardButtonProps {
  icon: ReactNode;
  label: string;
  onClick: (label: string) => void;  
  Redirection:string
}

export function CardButton({ icon, label, onClick, Redirection }: CardButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
    >
      <Card
        onClick={() => onClick(Redirection)}
        className="flex items-center bg-gradient-to-br from-amber-50 to-amber-100 gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 cursor-pointer hover:shadow-lg transition-all duration-300 rounded-lg sm:rounded-xl border border-amber-200/50"
      >
        <motion.div
          className="flex-shrink-0 text-green-500 text-xl sm:text-2xl md:text-3xl"
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        <>
          <motion.p
            className="font-medium sm:font-semibold text-sm sm:text-base text-gray-800"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {label}
          </motion.p>
        </>
      </Card>
    </motion.div>
  );
}