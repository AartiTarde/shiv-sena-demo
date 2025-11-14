"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
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
      
      // Validate age inputs
      if (ageFrom !== null && (isNaN(ageFrom) || ageFrom < 0 || ageFrom > 150)) {
        // Invalid age from, skip filtering
      } else if (ageTo !== null && (isNaN(ageTo) || ageTo < 0 || ageTo > 150)) {
        // Invalid age to, skip filtering
      } else if (ageFrom !== null && ageTo !== null) {
        // Both inputs provided - use range
        const minAge = Math.min(ageFrom, ageTo);
        const maxAge = Math.max(ageFrom, ageTo);
        filtered = filtered.filter((voter) => {
          if (!voter.age) return false;
          const voterAge = parseInt(voter.age);
          return !isNaN(voterAge) && voterAge >= 0 && voterAge <= 150 && voterAge >= minAge && voterAge <= maxAge;
        });
      } else if (ageFrom !== null && !isNaN(ageFrom) && ageFrom > 0 && ageFrom <= 150) {
        // Only "Age From" provided - apply ±5 formula
        const minAge = Math.max(0, ageFrom - 5); // Ensure age doesn't go below 0
        const maxAge = Math.min(150, ageFrom + 5); // Ensure age doesn't exceed 150
        filtered = filtered.filter((voter) => {
          if (!voter.age) return false;
          const voterAge = parseInt(voter.age);
          return !isNaN(voterAge) && voterAge >= minAge && voterAge <= maxAge;
        });
      } else if (ageTo !== null && !isNaN(ageTo) && ageTo > 0 && ageTo <= 150) {
        // Only "Age To" provided - apply ±5 formula
        const minAge = Math.max(0, ageTo - 5); // Ensure age doesn't go below 0
        const maxAge = Math.min(150, ageTo + 5); // Ensure age doesn't exceed 150
        filtered = filtered.filter((voter) => {
          if (!voter.age) return false;
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

  const totalPages = detailsResults.length > 0 ? Math.max(1, Math.ceil(detailsResults.length / ITEMS_PER_PAGE)) : 1;
  
  // Ensure current page is within valid bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = detailsResults.slice(startIndex, endIndex);

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
                // Excel export functionality will be implemented here
              }}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 btn-secondary"
              title="Download Excel"
              aria-label="Export to Excel"
            >
              <img
                src="/excel.jpg"
                alt="Excel Export"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).classList.add("img-error");
                }}
              />
              <span className="text-xs md:text-sm text-slate-900 font-medium hidden sm:inline">Export Excel</span>
            </button>
          </motion.div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-2 md:gap-3">
            <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto sm:flex-initial">
              <select
                value={detailsAssembly}
                onChange={(e) => setDetailsAssembly(e.target.value)}
                className="flex-1 input-base input-height"
              >
                <option value="">Select Assembly</option>
                <option value="assembly1">Assembly 1</option>
                <option value="assembly2">Assembly 2</option>
                <option value="assembly3">Assembly 3</option>
              </select>

              <select
                value={detailsWard}
                onChange={(e) => setDetailsWard(e.target.value)}
                className="flex-1 input-base input-height"
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
                onChange={(e) => setDetailsName(e.target.value.slice(0, 100))}
                placeholder="Enter Your name"
                maxLength={100}
                className="flex-1 input-base input-height"
                aria-label="Enter Your name"
              />

              <input
                type="text"
                value={detailsRelativeName}
                onChange={(e) => setDetailsRelativeName(e.target.value.slice(0, 100))}
                placeholder="Enter Your Relative name"
                maxLength={100}
                className="flex-1 input-base input-height"
                aria-label="Enter Your Relative name"
              />
            </div>

            <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto sm:flex-initial">
              <input
                type="number"
                value={detailsAgeFrom}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 150)) {
                    setDetailsAgeFrom(value);
                  }
                }}
                placeholder="Age From"
                min="0"
                max="150"
                className="flex-1 input-base input-height"
                aria-label="Age From"
              />

              <input
                type="number"
                value={detailsAgeTo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 150)) {
                    setDetailsAgeTo(value);
                  }
                }}
                placeholder="Age To"
                min="0"
                max="150"
                className="flex-1 input-base input-height"
                aria-label="Age To"
              />
            </div>

            <button
              onClick={handleDetailsSearch}
              className="btn-primary input-height w-full sm:w-auto"
            >
              SEARCH
            </button>
          </div>
        </motion.div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {(detailsAssembly || detailsWard || detailsName.trim() || detailsRelativeName.trim() || detailsAgeFrom.trim() || detailsAgeTo.trim()) && detailsResults.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
              <p className="text-xs sm:text-sm md:text-base text-slate-600">No voters found matching your search criteria</p>
            </div>
          ) : (
            <>
              <div className="px-2 sm:px-3 md:px-6 pt-2 pb-2 sm:pb-3 md:pb-4 flex-shrink-0">
                <p className="text-xs sm:text-sm md:text-base text-slate-600">
                  Showing <span className="font-bold text-slate-900">{detailsResults.length}</span> result{detailsResults.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex-1 min-h-0 scrollable-container px-2 sm:px-3 md:px-6 scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {currentResults.map((person) => (
                    <div key={person.id} className="w-full">
                      <VoterCard person={person} />
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

