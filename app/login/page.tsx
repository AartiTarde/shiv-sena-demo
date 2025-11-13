"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { secureLogin, SecureAuth } from "../utils/auth";
import { validateEmail, sanitizeInput, rateLimiter } from "../utils/security";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (SecureAuth.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Rate limiting check
      const clientId = typeof window !== "undefined" ? window.location.hostname : "default";
      if (!rateLimiter.isAllowed(`login_${clientId}`)) {
        setError("Too many login attempts. Please wait a minute and try again.");
        setIsLoading(false);
        return;
      }

      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);

      // Validate email format
      if (!validateEmail(sanitizedEmail)) {
        setError("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }

      // Validate password length
      if (sanitizedPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
      }

      // Attempt secure login
      const loginSuccess = secureLogin(sanitizedEmail, sanitizedPassword);

      if (loginSuccess) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-peach-50">
      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center bg-[#fff8f0] flex-shrink-0 min-h-[100px] lg:min-h-screen">
        <img 
          src="/baner.png" 
          alt="Login Banner" 
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to jpg if png fails
            const target = e.target as HTMLImageElement;
            if (target.src.includes('baner.png')) {
              target.src = '/baner.jpg';
            } else {
              target.classList.add("img-error");
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carrot/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-border-light">
            <div className="text-center mb-6 md:mb-8">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="text-left w-full max-w-[250px]">
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="w-full h-auto object-contain" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).classList.add("img-error");
                    }}
                  />
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
                  onChange={(e) => {
                    const sanitized = sanitizeInput(e.target.value);
                    setEmail(sanitized);
                  }}
                  className="w-full px-4 py-3 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900 placeholder:text-slate-500"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  maxLength={254}
                />
              </div>

              <div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    const sanitized = sanitizeInput(e.target.value);
                    setPassword(sanitized);
                  }}
                  className="w-full px-4 py-3 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900 placeholder:text-slate-500"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  minLength={6}
                  maxLength={128}
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-carrot hover:bg-burnt text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
              {/* Removed demo credentials display for security */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

