"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getTranslations } from "../../../utils/translations";
import { useLoader } from "../../../contexts/LoaderContext";

const searchTypes = [
  { id: "epic", labelKey: "searchByEpic", path: "/dashboard/search/epic" },
  { id: "details", labelKey: "searchByDetails", path: "/dashboard/search/details" },
  { id: "added", labelKey: "addedAfterVS", path: "/dashboard/search/added" },
  { id: "deleted", labelKey: "deletedAfterVS", path: "/dashboard/search/deleted" },
  { id: "double", labelKey: "doubleVoters", path: "/dashboard/search/double" },
];


export default function SearchNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const translations = getTranslations(language);
  const { triggerLoader } = useLoader();

  const getActiveId = () => {
    if (pathname?.includes("/epic")) return "epic";
    if (pathname?.includes("/details")) return "details";
    if (pathname?.includes("/added")) return "added";
    if (pathname?.includes("/deleted")) return "deleted";
    if (pathname?.includes("/double")) return "double";
    return "";
  };

  const activeId = getActiveId();

  return (
    <motion.div 
      className="bg-peach-50 p-2 sm:p-2.5 md:p-4 border-b border-border-light mobile-fixed-header xl:static"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-nowrap items-center justify-between gap-2 sm:gap-3">
        <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto md:scrollbar-hide flex-1 scrollbar-thin scrollbar-thumb-carrot scrollbar-track-peach-100 pb-2">
          {searchTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={type.path}
                className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-medium text-[10px] sm:text-xs md:text-sm transition-colors whitespace-nowrap flex-shrink-0 nav-btn-height flex items-center ${
                  activeId === type.id
                    ? "bg-carrot text-white"
                    : "bg-white text-slate-900 border border-border-light hover:bg-peach-50"
                }`}
                onClick={() => triggerLoader(900)}
              >
                {translations[type.labelKey as keyof typeof translations]}
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

