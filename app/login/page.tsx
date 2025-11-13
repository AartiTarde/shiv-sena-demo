"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Demo login credentials
  const DEMO_EMAIL = "demo@example.com";
  const DEMO_PASSWORD = "demo123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Use demo@example.com / demo123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-peach-50 p-4">
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-border-light">
        <div className="text-center mb-6 md:mb-8">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="text-left w-full max-w-[250px]">
              <img src="/logo.png" alt="Logo" className="w-full h-auto object-contain" />
            </div>
          </div>
          <hr className="my-4 md:my-6 border-border-light" />
        </div>
        

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900 placeholder:text-slate-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900 placeholder:text-slate-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-carrot hover:bg-burnt text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
          <div className="bg-peach-200 border border-border-light p-4 rounded-lg">
            <p className="text-sm text-slate-900 font-medium mb-1">
              Demo Credentials:
            </p>
            <p className="text-xs text-slate-500">
              Email: <span className="font-mono text-slate-900">{DEMO_EMAIL}</span>
            </p>
            <p className="text-xs text-slate-500">
              Password: <span className="font-mono text-slate-900">{DEMO_PASSWORD}</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

