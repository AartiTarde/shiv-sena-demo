"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";

type MenuItem = {
  id: string;
  label: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "search", label: "Search", icon: "search" },
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
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

  const getSelectedMenu = () => {
    if (pathname?.startsWith("/dashboard/search")) return "search";
    if (pathname === "/dashboard") return "dashboard";
    return "dashboard";
  };

  const renderContent = () => {
    if (pathname?.startsWith("/dashboard/search")) {
      return null; // Let Next.js routing handle search pages
    }
    
    const selected = getSelectedMenu();
    if (selected === "dashboard") {
      return <Overview />;
    }
    // For other menu items, show appropriate component
    return <Overview />;
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-peach-50 flex overflow-x-hidden">
      {/* Sidebar Component */}
      <Sidebar
        menuItems={menuItems}
        selectedMenu={getSelectedMenu()}
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Content - Changes based on selected menu */}
        <main className="flex-1 w-full md:ml-64 min-h-screen overflow-x-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

