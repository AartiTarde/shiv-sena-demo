"use client";

import { createContext, useContext, ReactNode } from "react";

interface SidebarContextType {
  onMobileMenuToggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ 
  children, 
  onMobileMenuToggle 
}: { 
  children: ReactNode;
  onMobileMenuToggle: () => void;
}) {
  return (
    <SidebarContext.Provider value={{ onMobileMenuToggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  return context;
}

