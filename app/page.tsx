"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is logged in (simple check)
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  if (!isClient) {
    return null;
  }

  return null;
}

