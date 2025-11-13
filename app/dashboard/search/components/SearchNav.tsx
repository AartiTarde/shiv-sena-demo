"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getTranslations } from "../../../utils/translations";

const searchTypes = [
  { id: "epic", labelKey: "searchByEpic", path: "/dashboard/search/epic" },
  { id: "details", labelKey: "searchByDetails", path: "/dashboard/search/details" },
  { id: "added", labelKey: "addedAfterVS", path: "/dashboard/search/added" },
  { id: "deleted", labelKey: "deletedAfterVS", path: "/dashboard/search/deleted" },
  { id: "double", labelKey: "doubleVoters", path: "/dashboard/search/double" },
];

const languages = [
  { code: "en" as const, name: "English", nativeName: "English" },
  { code: "mr" as const, name: "Marathi", nativeName: "मराठी" },
  { code: "hi" as const, name: "Hindi", nativeName: "हिन्दी" },
];

export default function SearchNav() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const translations = getTranslations(language);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getActiveId = () => {
    if (pathname?.includes("/epic")) return "epic";
    if (pathname?.includes("/details")) return "details";
    if (pathname?.includes("/added")) return "added";
    if (pathname?.includes("/deleted")) return "deleted";
    if (pathname?.includes("/double")) return "double";
    return "";
  };

  const activeId = getActiveId();
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  return (
    <motion.div 
      className="bg-peach-50 p-2 sm:p-2.5 md:p-4 border-b border-border-light mobile-fixed-header md:static"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-nowrap items-center justify-between gap-2 sm:gap-3">
        <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto md:scrollbar-hide flex-1 scrollbar-thin scrollbar-thumb-carrot scrollbar-track-peach-100 pb-1">
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
              >
                {translations[type.labelKey as keyof typeof translations]}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Language Selector */}
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <motion.button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-medium text-[10px] sm:text-xs md:text-sm bg-white text-slate-900 border border-border-light hover:bg-peach-50 transition-colors whitespace-nowrap nav-btn-height flex items-center gap-1.5 sm:gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Select Language"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>

          {/* Dropdown Menu */}
          {isLanguageDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-border-light z-50 overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLanguageDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-peach-50 transition-colors flex items-center justify-between ${
                    language === lang.code ? "bg-peach-100 font-semibold" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-slate-900">{lang.nativeName}</span>
                    <span className="text-xs text-slate-500">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <svg
                      className="w-4 h-4 text-carrot"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

