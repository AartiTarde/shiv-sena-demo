"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SecureAuth } from "./utils/auth";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is logged in using secure auth
    if (SecureAuth.isAuthenticated()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isClient) {
    return null;
  }

  return null;
}

