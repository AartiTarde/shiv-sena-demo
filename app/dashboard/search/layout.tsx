"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { SidebarProvider } from "../../contexts/SidebarContext";
import { SecureAuth } from "../../utils/auth";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "search", label: "Search", icon: "search" },
];

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize session monitoring
    SecureAuth.initSessionMonitoring();

    // Check authentication
    if (!SecureAuth.isAuthenticated()) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    SecureAuth.clearAuth();
    router.push("/login");
  };

  const handleMenuClick = (menuId: string) => {
    setIsMobileMenuOpen(false);
    switch (menuId) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "search":
        router.push("/dashboard/search");
        break;
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <LanguageProvider>
      <SidebarProvider onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <div className="min-h-screen bg-peach-50 flex overflow-x-hidden h-screen">
          <Sidebar
            menuItems={menuItems}
            selectedMenu="search"
            onMenuClick={handleMenuClick}
            onLogout={handleLogout}
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <main className="flex-1 w-full md:ml-64 overflow-x-hidden h-screen flex flex-col">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </LanguageProvider>
  );
}

