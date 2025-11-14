"use client";

import { motion } from "framer-motion";

const ringVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 2.4,
      ease: "linear",
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [0.95, 1.05, 0.95],
    opacity: [0.8, 1, 0.8],
    transition: {
      repeat: Infinity,
      duration: 1.8,
      ease: "easeInOut",
    },
  },
};

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-peach-50/80 backdrop-blur-2xl"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 sm:gap-5 px-6">
        <motion.div
          className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/80 shadow-2xl border border-white/60 overflow-hidden"
          variants={pulseVariants}
          animate="animate"
        >
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-carrot/60 border-t-transparent"
            variants={ringVariants}
            animate="animate"
          />
          <motion.img
            src="/loader.png"
            alt="Party emblem"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            initial={{ scale: 0.85, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
        {/* <motion.p
          className="text-sm sm:text-base font-semibold text-slate-900 tracking-wide text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Preparing your dashboard…
        </motion.p> */}
      </div>
    </div>
  );
}

