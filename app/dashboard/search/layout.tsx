"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

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

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-peach-50 flex overflow-x-hidden">
      <Sidebar
        menuItems={menuItems}
        selectedMenu="search"
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="flex-1 w-full md:ml-64 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

