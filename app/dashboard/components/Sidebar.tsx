"use client";

import Link from "next/link";
import { Fragment } from "react";

type MenuItem = {
  id: string;
  label: string;
  icon: string;
};

type SidebarProps = {
  menuItems: MenuItem[];
  selectedMenu: string;
  onMenuClick: (menuId: string) => void;
  onLogout: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
};

export default function Sidebar({
  menuItems,
  selectedMenu,
  onMenuClick,
  onLogout,
  isMobileMenuOpen,
  onMobileMenuToggle,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 max-w-[85vw] bg-white shadow-lg flex flex-col border-r border-border-light transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        }`}
      >
        {/* Branding Section */}
        <div className="p-4 md:p-6 border-b border-border-light">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/dashboard">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full max-w-[200px] h-auto object-contain" 
              onError={(e) => {
                (e.target as HTMLImageElement).classList.add("img-error");
              }}
            /></Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 md:p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const getIcon = (iconType: string) => {
                switch (iconType) {
                  case "dashboard":
                    return (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    );
                  case "search":
                    return (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              return (
                <Fragment key={item.id}>
                  <li key={item.id}>
                    <button
                      onClick={() => onMenuClick(item.id)}
                      className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 text-left ${
                        selectedMenu === item.id
                          ? "bg-peach-200 text-slate-900"
                          : "text-slate-900 hover:bg-peach-50"
                      }`}
                    >
                      <span className="text-slate-900 flex-shrink-0">{getIcon(item.icon)}</span>
                      <span className="font-bold text-xs md:text-sm uppercase tracking-wide truncate">{item.label}</span>
                    </button>
                  </li>
                  {item.id === "search" && (
                    <li key="logout" className="pt-1">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 text-left text-slate-900 hover:bg-red-50 hover:text-red-600 group"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-bold text-xs md:text-sm uppercase tracking-wide truncate">Logout</span>
                      </button>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

