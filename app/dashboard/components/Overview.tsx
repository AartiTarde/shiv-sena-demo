"use client";

import { motion } from "framer-motion";
import MobileHeader from "./MobileHeader";

type OverviewProps = {
  onMobileMenuToggle?: () => void;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Overview({ onMobileMenuToggle }: OverviewProps) {
  return (
    <>
    <MobileHeader onMobileMenuToggle={onMobileMenuToggle} />
    <div className="px-4 pb-4 pt-2 md:px-10 md:py-10">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light hover:border-carrot transition-colors"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-slate-500">
                Total Voters
              </p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 md:mt-2">
                2,45,678
              </p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light hover:border-carrot transition-colors"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-slate-500">
                Total Wards
              </p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 md:mt-2">
                1,234
              </p>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

