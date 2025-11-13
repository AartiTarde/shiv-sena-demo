"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBanner from "../components/SearchBanner";
import SearchNav from "../components/SearchNav";
import MobileHeader from "../../components/MobileHeader";
import VoterCard from "../components/VoterCard";
import Pagination from "../components/Pagination";
import { generateResults, VoterData } from "../utils/data";
import { ITEMS_PER_PAGE } from "../utils/constants";

export default function DetailsSearchPage() {
  const [detailsAssembly, setDetailsAssembly] = useState("");
  const [detailsWard, setDetailsWard] = useState("");
  const [detailsName, setDetailsName] = useState("");
  const [detailsRelativeName, setDetailsRelativeName] = useState("");
  const [detailsAgeFrom, setDetailsAgeFrom] = useState("");
  const [detailsAgeTo, setDetailsAgeTo] = useState("");
  const [defaultResults] = useState<VoterData[]>(generateResults(18));
  const [currentPage, setCurrentPage] = useState(1);

  // Filter results based on search criteria
  const detailsResults = useMemo(() => {
    let filtered = [...defaultResults];

    // Filter by assembly
    if (detailsAssembly) {
      filtered = filtered.filter((voter) => voter.assembly === detailsAssembly);
    }

    // Filter by ward
    if (detailsWard) {
      filtered = filtered.filter((voter) => voter.ward === detailsWard);
    }

    // Filter by name
    if (detailsName.trim()) {
      const nameQuery = detailsName.trim().toUpperCase();
      filtered = filtered.filter((voter) =>
        voter.name.toUpperCase().includes(nameQuery)
      );
    }

    // Filter by relative name
    if (detailsRelativeName.trim()) {
      const relativeQuery = detailsRelativeName.trim().toUpperCase();
      filtered = filtered.filter((voter) =>
        voter.relativeName.toUpperCase().includes(relativeQuery)
      );
    }

    // Filter by age (supports range from two inputs or single age with ±5 formula)
    if (detailsAgeFrom.trim() || detailsAgeTo.trim()) {
      const ageFrom = detailsAgeFrom.trim() ? parseInt(detailsAgeFrom.trim()) : null;
      const ageTo = detailsAgeTo.trim() ? parseInt(detailsAgeTo.trim()) : null;
      
      if (ageFrom !== null && ageTo !== null) {
        // Both inputs provided - use range
        const minAge = Math.min(ageFrom, ageTo);
        const maxAge = Math.max(ageFrom, ageTo);
        filtered = filtered.filter((voter) => {
          const voterAge = parseInt(voter.age);
          return !isNaN(voterAge) && voterAge >= minAge && voterAge <= maxAge;
        });
      } else if (ageFrom !== null && !isNaN(ageFrom) && ageFrom > 0) {
        // Only "Age From" provided - apply ±5 formula
        const minAge = Math.max(0, ageFrom - 5); // Ensure age doesn't go below 0
        const maxAge = ageFrom + 5;
        filtered = filtered.filter((voter) => {
          const voterAge = parseInt(voter.age);
          return !isNaN(voterAge) && voterAge >= minAge && voterAge <= maxAge;
        });
      } else if (ageTo !== null && !isNaN(ageTo) && ageTo > 0) {
        // Only "Age To" provided - apply ±5 formula
        const minAge = Math.max(0, ageTo - 5); // Ensure age doesn't go below 0
        const maxAge = ageTo + 5;
        filtered = filtered.filter((voter) => {
          const voterAge = parseInt(voter.age);
          return !isNaN(voterAge) && voterAge >= minAge && voterAge <= maxAge;
        });
      }
    }

    // If no filters applied, show default results
    const hasFilters = detailsAssembly || detailsWard || detailsName.trim() || detailsRelativeName.trim() || detailsAgeFrom.trim() || detailsAgeTo.trim();
    return hasFilters ? filtered : defaultResults;
  }, [detailsAssembly, detailsWard, detailsName, detailsRelativeName, detailsAgeFrom, detailsAgeTo, defaultResults]);

  const handleDetailsSearch = () => {
    setCurrentPage(1);
    // Filtering happens automatically via useMemo
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [detailsAssembly, detailsWard, detailsName, detailsRelativeName, detailsAgeFrom, detailsAgeTo]);

  const totalPages = Math.ceil(detailsResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = detailsResults.slice(startIndex, endIndex);

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
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">Search by Details</h1>
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
          <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto sm:flex-initial">
            <select
              value={detailsAssembly}
              onChange={(e) => setDetailsAssembly(e.target.value)}
              className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm focus:ring-2 focus:ring-carrot focus:border-carrot outline-none min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
            >
              <option value="">Select Assembly</option>
              <option value="assembly1">Assembly 1</option>
              <option value="assembly2">Assembly 2</option>
              <option value="assembly3">Assembly 3</option>
            </select>

            <select
              value={detailsWard}
              onChange={(e) => setDetailsWard(e.target.value)}
              className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm focus:ring-2 focus:ring-carrot focus:border-carrot outline-none min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
            >
              <option value="">Select Ward</option>
              <option value="ward 1">Ward 1</option>
              <option value="ward 2">Ward 2</option>
              <option value="ward 3">Ward 3</option>
              <option value="ward 4">Ward 4</option>
            </select>
          </div>

          <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto sm:flex-initial">
            <input
              type="text"
              value={detailsName}
              onChange={(e) => setDetailsName(e.target.value)}
              placeholder="Enter Your name"
              className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm focus:ring-2 focus:ring-carrot focus:border-carrot outline-none min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
            />

            <input
              type="text"
              value={detailsRelativeName}
              onChange={(e) => setDetailsRelativeName(e.target.value)}
              placeholder="Enter Your Relative name"
              className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm focus:ring-2 focus:ring-carrot focus:border-carrot outline-none min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
            />
          </div>

          <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto sm:flex-initial">
            <input
              type="number"
              value={detailsAgeFrom}
              onChange={(e) => setDetailsAgeFrom(e.target.value)}
              placeholder="Age From"
              min="0"
              className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm focus:ring-2 focus:ring-carrot focus:border-carrot outline-none min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
            />

            <input
              type="number"
              value={detailsAgeTo}
              onChange={(e) => setDetailsAgeTo(e.target.value)}
              placeholder="Age To"
              min="0"
              className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2 border border-border-light rounded-lg bg-white text-slate-900 text-xs md:text-sm focus:ring-2 focus:ring-carrot focus:border-carrot outline-none min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
            />
          </div>

          <button
            onClick={handleDetailsSearch}
            className="bg-carrot hover:bg-burnt text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-colors whitespace-nowrap flex-shrink-0 w-full sm:w-auto min-h-[38px] sm:min-h-[40px] md:min-h-[44px]"
          >
            SEARCH
          </button>
        </div>

        {(detailsAssembly || detailsWard || detailsName.trim() || detailsRelativeName.trim() || detailsAgeFrom.trim() || detailsAgeTo.trim()) && detailsResults.length === 0 ? (
          <div className="text-center py-4 sm:py-6 md:py-8">
            <p className="text-xs sm:text-sm md:text-base text-slate-600">No voters found matching your search criteria</p>
          </div>
        ) : (
          <>
            <div className="mb-2 sm:mb-3 md:mb-4">
              <p className="text-xs sm:text-sm md:text-base text-slate-600">
                Showing <span className="font-bold text-slate-900">{detailsResults.length}</span> result{detailsResults.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="mb-4 sm:mb-5 md:mb-6 max-h-[calc(100vh-380px)] sm:max-h-[calc(100vh-390px)] md:max-h-[calc(100vh-385px)] lg:max-h-[calc(100vh-370px)] overflow-y-auto pr-0 sm:pr-2 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-3 md:gap-4 lg:gap-6 pb-2 sm:pb-3 md:pb-4">
                {currentResults.map((person) => (
                  <div key={person.id} className="w-full">
                    <VoterCard person={person} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </motion.div>
    </div>
  );
}

