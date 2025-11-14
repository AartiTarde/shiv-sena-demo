"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import SearchNav from "../components/SearchNav";
import MobileHeader from "../../components/MobileHeader";
import VoterCard from "../components/VoterCard";
import Pagination from "../components/Pagination";
import { VoterData, generateResults, fullDemoDatabase } from "../utils/data";
import { sanitizeInput, validateEpicNumber, rateLimiter } from "../../../utils/security";

const ITEMS_PER_PAGE = 9;

export default function EpicSearchPage() {
  const [epicSearchQuery, setEpicSearchQuery] = useState("");
  const [defaultVoters] = useState<VoterData[]>(generateResults(18)); // Show 18 default voters
  const [displayedVoters, setDisplayedVoters] = useState<VoterData[]>(defaultVoters);
  const [searchResult, setSearchResult] = useState<VoterData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEpicSearch = () => {
    const trimmedQuery = epicSearchQuery.trim();

    if (!trimmedQuery) {
      setDisplayedVoters(defaultVoters);
      setSearchResult(null);
      setIsSearched(false);
      setCurrentPage(1);
      setErrorMessage("");
      return;
    }

    const clientId = typeof window !== "undefined" ? window.location.hostname : "default";
    if (!rateLimiter.isAllowed(`epic_search_${clientId}`)) {
      setErrorMessage("Too many search requests. Please wait a minute and try again.");
      return;
    }

    setCurrentPage(1);
    setIsSearched(true);
    setErrorMessage("");

    const sanitized = sanitizeInput(trimmedQuery.toUpperCase());

    if (sanitized.length === 10 && !validateEpicNumber(sanitized)) {
      setErrorMessage("Invalid EPIC number format. Please enter a valid EPIC number.");
      setDisplayedVoters([]);
      setSearchResult(null);
      return;
    }

    const query = sanitized;
    const found = fullDemoDatabase.find(
      (voter) => voter.epicNo.toUpperCase() === query
    );
    
    if (found) {
      setSearchResult(found);
      setDisplayedVoters([found]);
    } else {
      const searchResults = fullDemoDatabase.filter((voter) =>
        voter.epicNo.toUpperCase().includes(query)
      );
      if (searchResults.length > 0) {
        setDisplayedVoters(searchResults);
        setSearchResult(null);
      } else {
        setDisplayedVoters([]);
        setSearchResult(null);
      }
    }
  };

  // Reset to default when search query is cleared
  useEffect(() => {
    if (!epicSearchQuery.trim()) {
      setErrorMessage("");
      handleEpicSearch();
    }
  }, [epicSearchQuery]);

  // Pagination calculations
  const totalPages = displayedVoters.length > 0 ? Math.max(1, Math.ceil(displayedVoters.length / ITEMS_PER_PAGE)) : 1;
  
  // Ensure current page is within valid bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = displayedVoters.slice(startIndex, endIndex);

  return (
    <div className="bg-peach-50 w-full overflow-x-hidden">
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
          <motion.h1 
            className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 md:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Search by EPIC
          </motion.h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
            <div className="relative flex-1 w-full sm:w-auto">
              <input
                type="text"
                value={epicSearchQuery}
                onChange={(e) => {
                  const sanitized = sanitizeInput(e.target.value.slice(0, 20).toUpperCase());
                  setEpicSearchQuery(sanitized);
                  if (errorMessage) setErrorMessage(""); // Clear error on new input
                }}
                onKeyDown={(e) => e.key === "Enter" && handleEpicSearch()}
                placeholder="Enter Your EPIC Number"
                maxLength={20}
                className="w-full border border-border-light rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition-colors px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-2.5 input-with-icon text-xs sm:text-sm md:text-base input-height md:min-h-auto"
                aria-label="Enter Your EPIC Number"
                pattern="[A-Z0-9]{1,20}"
                title="EPIC number should contain only letters and numbers"
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
              className="btn-primary px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base input-height md:min-h-auto w-full sm:w-auto"
            >
              SEARCH
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-600 text-xs sm:text-sm mt-2">{errorMessage}</p>
          )}
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {currentResults.length === 0 && isSearched ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
              <p className="text-xs sm:text-sm md:text-base text-slate-600">No voters found matching &quot;{epicSearchQuery}&quot;</p>
            </div>
          ) : searchResult && currentResults.length === 1 ? (
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-6 py-4 sm:py-6 md:py-8">
              <div className="max-w-4xl mx-auto">
                <VoterCard person={searchResult} isLarge={true} />
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="px-2 sm:px-3 md:px-6 pt-2 pb-2 sm:pb-3 md:pb-4 flex-shrink-0">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1 sm:mb-2">
                  {isSearched ? `Search Results (${displayedVoters.length})` : "Recent Voters"}
                </h2>
                {!searchResult && (
                  <p className="text-xs sm:text-sm md:text-base text-slate-600">
                    Showing <span className="font-bold text-slate-900">{displayedVoters.length}</span> result{displayedVoters.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <div className="flex-1 min-h-0 scrollable-container px-2 sm:px-3 md:px-6 scrollbar-thin pb-2 sm:pb-3 md:pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {currentResults.map((person) => (
                    <div key={person.id} className="w-full">
                      <VoterCard 
                        person={person} 
                        className="bg-white border border-slate-200 rounded-lg p-2 sm:p-2.5 md:p-3 shadow-md hover:shadow-xl transition-all duration-300 relative max-w-full overflow-hidden group h-full" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {currentResults.length > 0 && (!searchResult || displayedVoters.length > 1) && (
          <div className="pagination-container flex-shrink-0">
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
