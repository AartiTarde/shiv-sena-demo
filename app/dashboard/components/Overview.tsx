"use client";

import { motion } from "framer-motion";
import MobileHeader from "./MobileHeader";

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

export default function Overview() {
  return (
    <>
    <MobileHeader />
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

      <motion.div 
        className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            Recent Activity
          </h2>
          <span className="bg-carrot text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
            3
          </span>
        </div>
        <div className="space-y-2 md:space-y-3">
          <motion.div 
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-peach-200 rounded-lg border border-border-light hover:bg-peach-200 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-carrot-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-carrot" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 font-medium text-sm md:text-base truncate">
                New voter registration completed
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                2 minutes ago
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg border border-border-light hover:bg-peach-200 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-carrot-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-carrot" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 font-medium text-sm md:text-base truncate">
                Voter data updated successfully
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                15 minutes ago
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg border border-border-light hover:bg-peach-200 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-carrot-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-carrot" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 font-medium text-sm md:text-base truncate">
                EPIC verification report generated
              </p>
              <p className="text-xs md:text-sm text-slate-500">
                1 hour ago
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
    </>
  );
}

