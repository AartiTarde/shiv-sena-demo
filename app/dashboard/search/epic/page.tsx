"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBanner from "../components/SearchBanner";
import SearchNav from "../components/SearchNav";
import MobileHeader from "../../components/MobileHeader";
import VoterCard from "../components/VoterCard";
import Pagination from "../components/Pagination";
import { VoterData, generateResults, fullDemoDatabase } from "../utils/data";
import { ITEMS_PER_PAGE } from "../utils/constants";

export default function EpicSearchPage() {
  const [epicSearchQuery, setEpicSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<VoterData | null>(null);
  const [defaultVoters] = useState<VoterData[]>(generateResults(18)); // Show 18 default voters
  const [currentPage, setCurrentPage] = useState(1);

  // Filter default voters based on search query (for live filtering)
  const filteredDefaultVoters = useMemo(() => {
    if (!epicSearchQuery.trim()) {
      return defaultVoters;
    }
    const query = epicSearchQuery.trim().toUpperCase();
    return defaultVoters.filter((voter) =>
      voter.epicNo.toUpperCase().includes(query)
    );
  }, [epicSearchQuery, defaultVoters]);

  // Search in full demo database
  const searchResults = useMemo(() => {
    if (!epicSearchQuery.trim()) {
      return [];
    }
    const query = epicSearchQuery.trim().toUpperCase();
    return fullDemoDatabase.filter((voter) =>
      voter.epicNo.toUpperCase().includes(query)
    );
  }, [epicSearchQuery]);

  const handleEpicSearch = () => {
    if (epicSearchQuery.trim()) {
      const query = epicSearchQuery.trim().toUpperCase();
      const found = fullDemoDatabase.find(
        (voter) => voter.epicNo.toUpperCase() === query
      );
      
      if (found) {
        // If exact match found, show single result
        setSearchResult(found);
      } else if (searchResults.length > 0) {
        // If multiple matches found, show list (no single result)
        setSearchResult(null);
      } else {
        // If not found, show a mock result with the searched EPIC
        setSearchResult({
          id: 999,
          epicNo: epicSearchQuery.trim().toUpperCase(),
          serialNo: "999",
          name: "RAJESH KUMAR",
          age: "35",
          gender: "Male",
          relativeName: "RAMESH KUMAR",
          partNo: "001",
          partName: "Sample Part Name",
          wardNumber: "Ward 10",
          pollingStation: "ANAND NAGAR UPPER PRIMARY MARATHI MUMBAI PUBLIC SCHOOL NO. 2, GROUND FLOOR, ROOM NO.10, V.N.PURAV MARG(SOUTH), CHEMBUR MUMBAI-71"
        });
      }
      setCurrentPage(1);
    } else {
      // Clear search result if query is empty
      setSearchResult(null);
      setCurrentPage(1);
    }
  };

  // Determine which results to display
  const displayResults = useMemo(() => {
    if (searchResult) {
      // Single search result (exact match or mock)
      return [searchResult];
    } else if (epicSearchQuery.trim() && searchResults.length > 0) {
      // Multiple search results
      return searchResults;
    } else {
      // Default voters (filtered if query exists)
      return filteredDefaultVoters;
    }
  }, [searchResult, epicSearchQuery, searchResults, filteredDefaultVoters]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [epicSearchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(displayResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = displayResults.slice(startIndex, endIndex);

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
        <motion.h1 
          className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 md:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Search by EPIC
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center mb-3 sm:mb-4 md:mb-6">
          <div className="relative flex-1 w-full sm:w-auto">
            <input
              type="text"
              value={epicSearchQuery}
              onChange={(e) => setEpicSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleEpicSearch()}
              placeholder="Enter Your EPIC Number"
              className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2.5 pr-8 sm:pr-10 border border-border-light rounded-lg bg-white text-slate-900 text-xs sm:text-sm md:text-base focus:ring-2 focus:ring-carrot focus:border-carrot outline-none min-h-[38px] sm:min-h-[40px] md:min-h-auto"
            />
            <svg
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleEpicSearch}
            className="bg-carrot hover:bg-burnt text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-colors whitespace-nowrap flex-shrink-0 w-full sm:w-auto min-h-[38px] sm:min-h-[40px] md:min-h-auto"
          >
            SEARCH
          </button>
        </div>

        {displayResults.length === 0 ? (
          <div className="text-center py-4 sm:py-6 md:py-8">
            <p className="text-xs sm:text-sm md:text-base text-slate-600">No voters found matching &quot;{epicSearchQuery}&quot;</p>
          </div>
        ) : (
          <div>
            <div className="mb-2 sm:mb-3 md:mb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1 sm:mb-2">
                {epicSearchQuery.trim() && searchResult ? "Search Result" : epicSearchQuery.trim() ? `Search Results (${displayResults.length})` : "Recent Voters"}
              </h2>
              {!searchResult && (
                <p className="text-xs sm:text-sm md:text-base text-slate-600">
                  Showing <span className="font-bold text-slate-900">{displayResults.length}</span> result{displayResults.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {searchResult && displayResults.length === 1 ? (
              <div className="max-w-4xl mx-auto">
                <VoterCard person={searchResult} isLarge={true} />
              </div>
            ) : (
              <>
                <div className="mb-4 sm:mb-5 md:mb-6 max-h-[calc(100vh-380px)] sm:max-h-[calc(100vh-390px)] md:max-h-[calc(100vh-385px)] lg:max-h-[calc(100vh-370px)] overflow-y-auto pr-0 sm:pr-2 scrollbar-thin">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-3 md:gap-4 lg:gap-6 pb-2 sm:pb-3 md:pb-4">
                    {currentResults.map((person) => (
                      <div key={person.id} className="w-full">
                        <VoterCard person={person} />
                      </div>
                    ))}
                  </div>
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

