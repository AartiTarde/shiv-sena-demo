"use client";

import { motion } from "framer-motion";
import { VoterData } from "../utils/data";

type VoterCardProps = {
  person: VoterData;
  isLarge?: boolean;
};

// WhatsApp SVG path constant
const WHATSAPP_SVG_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.239-.375a9.85 9.85 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

// WhatsApp Button Component
const WhatsAppButton = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) => {
  const sizeClasses = {
    sm: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
    md: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10",
    lg: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
  };
  
  const iconSizeClasses = {
    sm: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4",
    md: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
    lg: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
  };

  return (
    <motion.button 
      className={`${sizeClasses[size]} bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 focus:outline-none focus:ring-4 focus:ring-green-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Share via WhatsApp"
    >
      <svg className={`${iconSizeClasses[size]} text-white`} fill="currentColor" viewBox="0 0 24 24">
        <path d={WHATSAPP_SVG_PATH} />
      </svg>
    </motion.button>
  );
};

export default function VoterCard({ person, isLarge = false }: VoterCardProps) {
  if (isLarge) {
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-lg border border-slate-100 p-3 sm:p-3.5 md:p-4 relative w-full max-w-full overflow-hidden hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.01, y: -4 }}
      >
        {/* Logo and EPIC Number Box */}
        <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-2.5 min-w-0">
          {/* Logo */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center h-10 sm:h-12 md:h-14">
            <img
              src="/poll.png"
              alt="Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-sm"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center h-8 sm:h-9 md:h-9 bg-orange-500 rounded-md px-1 py-1">
            <p className="text-[7px] sm:text-[8px] text-white mb-0 font-semibold uppercase tracking-wide text-center leading-tight">Ward</p>
            <p className="text-[8px] sm:text-[9px] font-bold text-white break-words text-center leading-tight">{person.wardNumber}</p>
          </div>
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center h-8 sm:h-9 md:h-9">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 to-peach-200 border border-carrot-200 rounded px-[3px] py-[2px] text-center shadow-sm">
              <p className="text-[8px] sm:text-[9px] font-bold text-slate-900 break-all truncate leading-tight">{person.epicNo}</p>
              <p className="text-[6px] sm:text-[7px] text-slate-600 font-medium mt-[1px] leading-tight">(EPIC NO)</p>
            </div>
          </div>
        </div>

        {/* Card Details - Improved Layout */}
        <div className="space-y-2 sm:space-y-2.5 md:space-y-3 mb-3 sm:mb-3.5 md:mb-4">
          {/* Personal Information Section */}
          <div className="bg-slate-50 rounded-md p-2 sm:p-2.5 space-y-2 sm:space-y-2.5 border border-slate-100">
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              {/* Left Column */}
              <div className="flex-1 min-w-0 space-y-2 sm:space-y-2.5">
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 uppercase tracking-wide">Serial No.</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900">{person.serialNo}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 uppercase tracking-wide">Age</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900">{person.age}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 uppercase tracking-wide">Gender</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900">{person.gender}</p>
                </div>
              </div>
              {/* Right Column - Name, Relative name, Part No */}
              <div className="flex-1 min-w-0 space-y-2 sm:space-y-2.5">
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 uppercase tracking-wide">Name</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900 break-words leading-snug">{person.name}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 uppercase tracking-wide">Relative name</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900 break-words leading-snug">{person.relativeName}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 uppercase tracking-wide">Part No</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900">{parseInt(person.partNo).toString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="bg-slate-50 rounded-md p-2 sm:p-2.5 space-y-2 sm:space-y-2.5 border border-slate-100">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 uppercase tracking-wide">Part Name</p>
              <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900 break-words leading-snug">{person.partName}</p>
            </div>
          </div>
        </div>

        {/* Polling Station Section */}
        <div className="bg-gradient-to-br from-peach-100 to-peach-200 border-2 border-carrot-200 rounded-lg p-2 sm:p-2.5 md:p-3 relative pr-10 sm:pr-12 md:pr-14 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-1 h-1 bg-carrot rounded-full"></div>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-900">Polling Station</p>
          </div>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-800 leading-relaxed pr-2 sm:pr-3 break-words font-medium">{person.pollingStation}</p>
          
          {/* WhatsApp Icon */}
          <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 md:bottom-3 md:right-3">
            <WhatsAppButton size="md" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white border border-slate-200 rounded-lg p-2 sm:p-2.5 md:p-3 shadow-md hover:shadow-xl transition-all duration-300 relative w-full max-w-full overflow-hidden group h-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Logo and EPIC Number Box */}
      <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-2.5 min-w-0">
        {/* Logo */}
        <img
          src="/poll.png"
          alt="Logo"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-sm"
        />
        {/* Ward Number */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center h-10 sm:h-12 md:h-14 bg-[#E57E22] rounded-md">
          <p className="text-[14px] sm:text-[14px] text-white mb-0.5 font-semibold uppercase tracking-wide text-center">Ward</p>
          <p className="text-[14px] sm:text-[14px] md:text-[14px] font-bold text-white break-words text-center">{person.wardNumber}</p>
        </div>
        {/* EPIC Number */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center h-10 sm:h-12 md:h-14 bg-gradient-to-br from-peach-100 to-peach-200 rounded-md">
          <p className="text-[14px] sm:text-[14px] text-black mb-0.5 font-semibold uppercase tracking-wide text-center">EPIC NO</p>
          <p className="text-[12px] sm:text-[10px] md:text-[12px] font-bold text-black break-words text-center">{person.epicNo}</p>
        </div>
      </div>

      {/* Card Details - Improved Layout */}
      <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 mb-2 sm:mb-2.5 md:mb-3">
        {/* Personal Information Section */}
        <div className="bg-slate-50 rounded-md p-2 sm:p-2.5 space-y-1.5 sm:space-y-2 border border-slate-100">
          <div className="flex gap-1.5 sm:gap-2 md:gap-2.5">
            {/* Left Column */}
            <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
              <div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 mb-0.5 font-semibold uppercase tracking-wide">Serial No.</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900">{person.serialNo}</p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 mb-0.5 font-semibold uppercase tracking-wide">Age</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900">{person.age}</p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 mb-0.5 font-semibold uppercase tracking-wide">Gender</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900">{person.gender}</p>
              </div>
              <div className="min-w-0">
            <p className="text-[8px] sm:text-[9px] text-slate-600 mb-0.5 font-semibold uppercase tracking-wide">Part Name</p>
            <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900 break-words leading-snug">{person.partName}</p>
          </div>
            </div>
            {/* Right Column - Name, Relative name, Part No */}
            <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
              <div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 mb-0.5 font-semibold uppercase tracking-wide">Name</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900 break-words leading-snug">{person.name}</p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 mb-0.5 font-semibold uppercase tracking-wide">Relative name</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900 break-words leading-snug">{person.relativeName}</p>
              </div>
              <div>
                <p className="text-[8px] sm:text-[9px] text-slate-600 mb-0.5 font-semibold uppercase tracking-wide">Part No</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900">{parseInt(person.partNo).toString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Polling Station Section */}
      <div className="bg-gradient-to-br from-peach-100 to-peach-200 border-2 border-carrot-200 rounded-md p-2 sm:p-2.5 md:p-3 relative pr-8 sm:pr-10 md:pr-12 shadow-sm">
        <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
          <div className="w-0.5 h-0.5 bg-carrot rounded-full"></div>
          <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-900">Polling Station</p>
        </div>
        <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-800 leading-relaxed break-words pr-1.5 sm:pr-2 font-medium">
          {person.pollingStation}
        </p>
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 md:bottom-2.5 md:right-2.5">
          <WhatsAppButton size="sm" />
        </div>
      </div>
    </motion.div>
  );
}

export type { VoterCardProps };

