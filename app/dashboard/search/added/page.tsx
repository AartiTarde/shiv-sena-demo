"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBanner from "../components/SearchBanner";
import SearchNav from "../components/SearchNav";
import MobileHeader from "../../components/MobileHeader";
import VoterCard from "../components/VoterCard";
import Pagination from "../components/Pagination";
import PartNumberDropdown from "../components/PartNumberDropdown";
import { generateResults, VoterData } from "../utils/data";
import { togglePartNumber as togglePartNumberUtil } from "../utils/partNumberUtils";
import { ITEMS_PER_PAGE, PART_NUMBERS } from "../utils/constants";

export default function AddedSearchPage() {
  const [addedAssembly, setAddedAssembly] = useState("");
  const [addedPartNumbers, setAddedPartNumbers] = useState<string[]>([]);
  const [defaultResults] = useState<VoterData[]>(generateResults(18));
  const [addedCurrentPage, setAddedCurrentPage] = useState(1);
  const [isPartNumberDropdownOpen, setIsPartNumberDropdownOpen] = useState(false);

  // Filter results based on search criteria
  const addedResults = useMemo(() => {
    let filtered = [...defaultResults];

    // Filter by assembly
    if (addedAssembly) {
      filtered = filtered.filter((voter) => voter.assembly === addedAssembly);
    }

    // Filter by part numbers (normalize format: "001" vs "1")
    if (addedPartNumbers.length > 0) {
      filtered = filtered.filter((voter) => {
        const voterPartNo = parseInt(voter.partNo).toString();
        return addedPartNumbers.some(
          (selectedPartNo) => parseInt(selectedPartNo).toString() === voterPartNo
        );
      });
    }

    // If no filters applied, show default results
    const hasFilters = addedAssembly || addedPartNumbers.length > 0;
    return hasFilters ? filtered : defaultResults;
  }, [addedAssembly, addedPartNumbers, defaultResults]);

  const handleAddedSearch = () => {
    setAddedCurrentPage(1);
    // Filtering happens automatically via useMemo
  };

  // Reset to first page when filters change
  useEffect(() => {
    setAddedCurrentPage(1);
  }, [addedAssembly, addedPartNumbers]);

  const togglePartNumber = (partNo: string) => {
    togglePartNumberUtil(partNo, PART_NUMBERS, addedPartNumbers, setAddedPartNumbers);
  };

  const totalPages = Math.ceil(addedResults.length / ITEMS_PER_PAGE);
  const startIndex = (addedCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const addedCurrentResults = addedResults.slice(startIndex, endIndex);

  return (
    <div className="bg-peach-50 min-h-full w-full overflow-x-hidden overflow-y-auto">
      <MobileHeader />
      <SearchNav />

      <motion.div 
        className="bg-peach-50 p-2 sm:p-3 md:p-6 w-full"
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
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">Added After VS</h1>
          <button
            onClick={() => {
              // TODO: Implement Excel download functionality
              console.log("Excel download clicked");
            }}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-white border border-border-light rounded-lg hover:bg-peach-50 transition-colors shadow-sm"
            title="Download Excel"
          >
            <img
              src="/excel.jpg"
              alt="Excel Export"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
            />
            <span className="text-xs md:text-sm text-slate-900 font-medium hidden sm:inline">Export Excel</span>
          </button>
        </motion.div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6">
          <select
            value={addedAssembly}
            onChange={(e) => setAddedAssembly(e.target.value)}
            className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm focus:ring-2 focus:ring-carrot focus:border-carrot outline-none flex-1 sm:flex-initial sm:min-w-[140px] min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
          >
            <option value="">Select Assembly</option>
            <option value="assembly1">Assembly 1</option>
            <option value="assembly2">Assembly 2</option>
            <option value="assembly3">Assembly 3</option>
          </select>

          <PartNumberDropdown
            selectedPartNumbers={addedPartNumbers}
            partNumbers={PART_NUMBERS}
            onToggle={togglePartNumber}
            isOpen={isPartNumberDropdownOpen}
            onToggleOpen={() => setIsPartNumberDropdownOpen(!isPartNumberDropdownOpen)}
          />

          <button
            onClick={handleAddedSearch}
            className="bg-carrot hover:bg-burnt text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-colors whitespace-nowrap flex-shrink-0 w-full sm:w-auto min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
          >
            SEARCH
          </button>
        </div>

        {(addedAssembly || addedPartNumbers.length > 0) && addedResults.length === 0 ? (
          <div className="text-center py-4 sm:py-6 md:py-8">
            <p className="text-xs sm:text-sm md:text-base text-slate-600">No voters found matching your search criteria</p>
          </div>
        ) : (
          <>
            <div className="mb-2 sm:mb-3 md:mb-4">
              <p className="text-xs sm:text-sm md:text-base text-slate-600">
                Showing <span className="font-bold text-slate-900">{addedResults.length}</span> result{addedResults.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="mb-4 sm:mb-5 md:mb-6 max-h-[calc(100vh-380px)] sm:max-h-[calc(100vh-390px)] md:max-h-[calc(100vh-385px)] lg:max-h-[calc(100vh-370px)] overflow-y-auto pr-0 sm:pr-2 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-3 md:gap-4 lg:gap-6 pb-2 sm:pb-3 md:pb-4">
                {addedCurrentResults.map((person) => (
                  <div key={person.id} className="w-full">
                    <VoterCard person={person} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Pagination
          currentPage={addedCurrentPage}
          totalPages={totalPages}
          onPageChange={setAddedCurrentPage}
        />
      </motion.div>
    </div>
  );
}

