"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const searchTypes = [
  { id: "epic", label: "Search by EPIC", path: "/dashboard/search/epic" },
  { id: "details", label: "Search by Details", path: "/dashboard/search/details" },
  { id: "added", label: "Added After VS", path: "/dashboard/search/added" },
  { id: "deleted", label: "Deleted After VS", path: "/dashboard/search/deleted" },
];

export default function SearchNav() {
  const pathname = usePathname();

  const getActiveId = () => {
    if (pathname?.includes("/epic")) return "epic";
    if (pathname?.includes("/details")) return "details";
    if (pathname?.includes("/added")) return "added";
    if (pathname?.includes("/deleted")) return "deleted";
    return "";
  };

  const activeId = getActiveId();

  return (
    <motion.div 
      className="bg-peach-50 p-2 sm:p-2.5 md:p-4 border-b border-border-light"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
        {searchTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={type.path}
              className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-medium text-[10px] sm:text-xs md:text-sm transition-colors whitespace-nowrap flex-shrink-0 min-h-[32px] sm:min-h-[36px] md:min-h-[40px] flex items-center ${
                activeId === type.id
                  ? "bg-carrot text-white"
                  : "bg-white text-slate-900 border border-border-light hover:bg-peach-50"
              }`}
            >
              {type.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

