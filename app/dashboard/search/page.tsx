"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SearchBanner from "./components/SearchBanner";
import MobileHeader from "../components/MobileHeader";
import Link from "next/link";
import { FaIdCard } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { VscDiffAdded } from "react-icons/vsc";
import { MdDeleteSweep } from "react-icons/md";
import { IconType } from "react-icons";

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

const searchTypes: Array<{
  id: string;
  label: string;
  path: string;
  icon: IconType;
}> = [
  { id: "epic", label: "Search by EPIC", path: "/dashboard/search/epic", icon: FaIdCard },
  { id: "details", label: "Search by Details", path: "/dashboard/search/details", icon: TbListDetails },
  { id: "added", label: "Added After VS", path: "/dashboard/search/added", icon: VscDiffAdded },
  { id: "deleted", label: "Deleted After VS", path: "/dashboard/search/deleted", icon: MdDeleteSweep },
];

export default function SearchPage() {
  const router = useRouter();

  return (
    <div className="bg-peach-50 min-h-full w-full overflow-x-hidden overflow-y-auto">
      <MobileHeader />
     

      <motion.div 
        className="bg-peach-50 p-4 md:p-6 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Search Options
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {searchTypes.map((type, index) => (
            <motion.div key={type.id} variants={itemVariants}>
              <Link
                href={type.path}
                className="bg-white border-2 border-border-light rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:border-carrot group block"
              >
                <motion.div 
                  className="flex flex-col items-center text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-carrot rounded-full flex items-center justify-center mb-4 group-hover:bg-burnt transition-colors">
                    <type.icon {...({ className: "w-8 h-8 md:w-10 md:h-10 text-white" } as any)} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{type.label}</h3>
                  <p className="text-sm text-slate-600">Click to search</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

