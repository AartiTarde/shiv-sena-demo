"use client";

import { motion } from "framer-motion";
import { useSidebar } from "../../contexts/SidebarContext";

type MobileHeaderProps = {
  onMobileMenuToggle?: () => void;
};

export default function MobileHeader({ onMobileMenuToggle }: MobileHeaderProps) {
  const sidebarContext = useSidebar();
  const handleToggle = onMobileMenuToggle || sidebarContext?.onMobileMenuToggle || (() => {});
  return (
    <motion.div 
      className="xl:hidden w-full bg-white border-b border-border-light shadow-sm mobile-fixed-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
        <motion.button
          onClick={handleToggle}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-peach-50"
          aria-label="Toggle sidebar"
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </motion.svg>
        </motion.button>
        <motion.div 
          className="flex items-center gap-1.5 sm:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-7 sm:h-8 w-auto" 
            onError={(e) => {
              (e.target as HTMLImageElement).classList.add("img-error");
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

