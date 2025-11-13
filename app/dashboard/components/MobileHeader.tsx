"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleMenuClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.div 
      className="md:hidden w-full bg-white border-b border-border-light shadow-sm sticky top-0 z-30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-peach-50"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </motion.button>
        <motion.div 
          className="flex items-center gap-1.5 sm:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img src="/logo.png" alt="Logo" className="h-7 sm:h-8 w-auto" />
        </motion.div>
      </div>
      
      {/* Mobile Menu Dropdown - Left to Right Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="border-t border-border-light bg-white overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1">
              <motion.button 
                onClick={() => handleMenuClick("/dashboard")}
                className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-peach-50 text-slate-900 font-medium text-sm sm:text-base"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Dashboard
              </motion.button>
              <motion.button 
                onClick={() => handleMenuClick("/dashboard/search")}
                className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-peach-50 text-slate-900 font-medium text-sm sm:text-base"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

