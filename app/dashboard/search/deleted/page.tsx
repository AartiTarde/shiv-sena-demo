"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import SearchNav from "../components/SearchNav";
import MobileHeader from "../../components/MobileHeader";
import VoterCard from "../components/VoterCard";
import Pagination from "../components/Pagination";
import PartNumberDropdown from "../components/PartNumberDropdown";
import { generateResults, VoterData } from "../utils/data";
import { togglePartNumber as togglePartNumberUtil } from "../utils/partNumberUtils";
import { ITEMS_PER_PAGE, PART_NUMBERS } from "../utils/constants";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getTranslations } from "../../../utils/translations";

export default function DeletedSearchPage() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [deletedAssembly, setDeletedAssembly] = useState("");
  const [deletedPartNumbers, setDeletedPartNumbers] = useState<string[]>([]);
  const [defaultResults] = useState<VoterData[]>(generateResults(18));
  const [deletedCurrentPage, setDeletedCurrentPage] = useState(1);
  const [isDeletedPartNumberDropdownOpen, setIsDeletedPartNumberDropdownOpen] = useState(false);

  // Filter results based on search criteria
  const deletedResults = useMemo(() => {
    let filtered = [...defaultResults];

    // Filter by assembly
    if (deletedAssembly) {
      filtered = filtered.filter((voter) => voter.assembly === deletedAssembly);
    }

    // Filter by part numbers (normalize format: "001" vs "1")
    if (deletedPartNumbers.length > 0) {
      filtered = filtered.filter((voter) => {
        const voterPartNo = parseInt(voter.partNo).toString();
        return deletedPartNumbers.some(
          (selectedPartNo) => parseInt(selectedPartNo).toString() === voterPartNo
        );
      });
    }

    // If no filters applied, show default results
    const hasFilters = deletedAssembly || deletedPartNumbers.length > 0;
    return hasFilters ? filtered : defaultResults;
  }, [deletedAssembly, deletedPartNumbers, defaultResults]);

  const handleDeletedSearch = () => {
    setDeletedCurrentPage(1);
    // Filtering happens automatically via useMemo
  };

  // Reset to first page when filters change
  useEffect(() => {
    setDeletedCurrentPage(1);
  }, [deletedAssembly, deletedPartNumbers]);

  const toggleDeletedPartNumber = (partNo: string) => {
    togglePartNumberUtil(partNo, PART_NUMBERS, deletedPartNumbers, setDeletedPartNumbers);
  };

  const totalPages = deletedResults.length > 0 ? Math.max(1, Math.ceil(deletedResults.length / ITEMS_PER_PAGE)) : 1;
  
  // Ensure current page is within valid bounds
  useEffect(() => {
    if (deletedCurrentPage > totalPages && totalPages > 0) {
      setDeletedCurrentPage(1);
    }
  }, [totalPages, deletedCurrentPage]);

  const safeCurrentPage = Math.max(1, Math.min(deletedCurrentPage, totalPages));
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const deletedCurrentResults = deletedResults.slice(startIndex, endIndex);

  return (
    <div className="bg-peach-50 w-full overflow-x-hidden page-container">
      <div className="mobile-fixed-header">
        <MobileHeader />
        <SearchNav />
      </div>

      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <motion.div 
          className="bg-peach-50 p-2 sm:p-3 md:p-6 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-2 sm:mb-3 md:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{t.deletedAfterVS}</h1>
            <button
              onClick={() => {
                // TODO: Implement Excel download functionality
                // Excel export functionality will be implemented here
              }}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 btn-secondary"
              title={t.exportExcel}
              aria-label={t.exportExcel}
            >
              <img
                src="/excel.jpg"
                alt={t.exportExcel}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).classList.add("img-error");
                }}
              />
              <span className="text-xs md:text-sm text-slate-900 font-medium hidden sm:inline">{t.exportExcel}</span>
            </button>
          </motion.div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-2 md:gap-3">
            <select
              value={deletedAssembly}
              onChange={(e) => setDeletedAssembly(e.target.value)}
              className="input-base input-height flex-1 sm:flex-initial sm:min-w-[140px]"
            >
              <option value="">{t.selectAssembly}</option>
              <option value="assembly1">Assembly 1</option>
              <option value="assembly2">Assembly 2</option>
              <option value="assembly3">Assembly 3</option>
            </select>

            <PartNumberDropdown
              selectedPartNumbers={deletedPartNumbers}
              partNumbers={PART_NUMBERS}
              onToggle={toggleDeletedPartNumber}
              isOpen={isDeletedPartNumberDropdownOpen}
              onToggleOpen={() => setIsDeletedPartNumberDropdownOpen(!isDeletedPartNumberDropdownOpen)}
            />

            <button
              onClick={handleDeletedSearch}
              className="btn-primary input-height w-full sm:w-auto"
            >
              {t.search}
            </button>
          </div>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {(deletedAssembly || deletedPartNumbers.length > 0) && deletedResults.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
              <p className="text-xs sm:text-sm md:text-base text-slate-600">{t.noVotersFound}</p>
            </div>
          ) : (
            <>
              <div className="px-2 sm:px-3 md:px-6 pt-2 pb-2 sm:pb-3 md:pb-4 flex-shrink-0">
                <p className="text-xs sm:text-sm md:text-base text-slate-600">
                  {t.showing} <span className="font-bold text-slate-900">{deletedResults.length}</span> {deletedResults.length !== 1 ? t.results : t.result}
                </p>
              </div>
              <div className="flex-1 min-h-0 scrollable-container px-2 sm:px-3 md:px-6 scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {deletedCurrentResults.map((person) => (
                    <div key={person.id} className="w-full">
                      <VoterCard person={person} />
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={setDeletedCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

