"use client";

import { motion } from "framer-motion";

export default function SearchBanner() {
  return (
    <motion.div 
      className="w-full flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full rounded-lg shadow-lg overflow-hidden">
        <img
          src="/baner.png"
          alt="Dashboard Visual"
          className="w-full h-auto object-fill max-h-[220px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]"
        />
      </div>
    </motion.div>
  );
}

