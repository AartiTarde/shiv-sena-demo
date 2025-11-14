"use client";

import { useRef, useEffect } from "react";

type PartNumberDropdownProps = {
  selectedPartNumbers: string[];
  partNumbers: string[];
  onToggle: (partNo: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
};

export default function PartNumberDropdown({
  selectedPartNumbers,
  partNumbers,
  onToggle,
  isOpen,
  onToggleOpen,
}: PartNumberDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);

  // Keep ref in sync with prop
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpenRef.current) {
          onToggleOpen();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onToggleOpen]);

  const handleToggle = (partNo: string) => {
    onToggle(partNo);
  };

  return (
    <div className="relative flex-1 sm:flex-initial" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggleOpen}
        className="dropdown-btn input-height"
        aria-label="Select Part Number"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex-1 min-w-0 text-left">
          {selectedPartNumbers.length === 0 ? (
            <span className="text-slate-500">Select Part Number</span>
          ) : selectedPartNumbers.length === partNumbers.length ? (
            "All Selected"
          ) : (
            <span className="whitespace-nowrap block overflow-x-auto scrollbar-hide">
              {[...selectedPartNumbers]
                .sort((a, b) => {
                  const numA = parseInt(a);
                  const numB = parseInt(b);
                  if (isNaN(numA) || isNaN(numB)) return 0;
                  return numA - numB;
                })
                .join(", ")}
            </span>
          )}
        </span>
        <svg
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 sm:right-auto mt-0.5 sm:mt-1 bg-white border border-border-light rounded-lg shadow-lg z-50 sm:w-full sm:min-w-[200px] dropdown-container overflow-y-auto"
          role="listbox"
          aria-label="Part Number Selection"
        >
          <div className="p-1.5 sm:p-2">
            <label className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 hover:bg-peach-50 cursor-pointer rounded dropdown-item-height">
              <input
                type="checkbox"
                checked={selectedPartNumbers.length === partNumbers.length}
                onChange={() => handleToggle("all")}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-carrot focus:ring-carrot border-border-light rounded flex-shrink-0"
                aria-label="Select All"
              />
              <span className="text-xs md:text-sm text-slate-900 font-medium">Select All</span>
            </label>
            <div className="border-t border-border-light my-0.5 sm:my-1"></div>
            {partNumbers.map((num) => (
              <label
                key={num}
                className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 hover:bg-peach-50 cursor-pointer rounded dropdown-item-height"
              >
                <input
                  type="checkbox"
                  checked={selectedPartNumbers.includes(num)}
                  onChange={() => handleToggle(num)}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-carrot focus:ring-carrot border-border-light rounded flex-shrink-0"
                  aria-label={`Select Part Number ${num}`}
                />
                <span className="text-xs md:text-sm text-slate-900">{num}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

