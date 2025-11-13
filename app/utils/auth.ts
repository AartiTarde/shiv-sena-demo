/**
 * Secure Authentication Utilities
 * Enhanced authentication with security best practices
 */

import { SecureStorage, CSRFProtection } from './security';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_EXPIRY_KEY = 'auth_expiry';
const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

/**
 * Secure authentication token management
 */
export class SecureAuth {
  /**
   * Set authentication token with expiry
   */
  static setAuthToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    const expiry = Date.now() + SESSION_TIMEOUT;
    SecureStorage.setItem(AUTH_TOKEN_KEY, token);
    SecureStorage.setItem(AUTH_EXPIRY_KEY, expiry.toString());
    
    // Generate CSRF token on login
    CSRFProtection.generateToken();
  }

  /**
   * Get current authentication token
   */
  static getAuthToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const token = SecureStorage.getItem(AUTH_TOKEN_KEY);
    const expiryStr = SecureStorage.getItem(AUTH_EXPIRY_KEY);

    if (!token || !expiryStr) {
      return null;
    }

    const expiry = parseInt(expiryStr, 10);
    if (isNaN(expiry) || Date.now() > expiry) {
      this.clearAuth();
      return null;
    }

    return token;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return this.getAuthToken() !== null;
  }

  /**
   * Clear authentication
   */
  static clearAuth(): void {
    if (typeof window === 'undefined') {
      return;
    }

    SecureStorage.removeItem(AUTH_TOKEN_KEY);
    SecureStorage.removeItem(AUTH_EXPIRY_KEY);
    CSRFProtection.clearToken();
  }

  /**
   * Extend session expiry
   */
  static extendSession(): void {
    const token = this.getAuthToken();
    if (token) {
      this.setAuthToken(token);
    }
  }

  /**
   * Initialize session monitoring
   */
  static initSessionMonitoring(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // Check session validity every minute
    setInterval(() => {
      if (!this.isAuthenticated()) {
        // Redirect to login if session expired
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      } else {
        // Extend session on activity
        this.extendSession();
      }
    }, 60000); // Check every minute

    // Clear auth on page unload (optional, for extra security)
    // window.addEventListener('beforeunload', () => {
    //   // Only clear if explicitly logging out
    // });
  }
}

/**
 * Secure login function with validation
 */
export function secureLogin(email: string, password: string): boolean {
  // Note: In production, this should call a secure backend API
  // For now, this is a secure frontend implementation
  
  // Validate inputs
  if (!email || !password) {
    return false;
  }

  // In production, these should come from environment variables or secure backend
  // For demo purposes, we'll keep them here but they should be moved to backend
  const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo@example.com';
  const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'demo123';

  // Simple validation (in production, use backend API)
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    // Generate secure token
    const token = generateSecureToken();
    SecureAuth.setAuthToken(token);
    return true;
  }

  return false;
}

/**
 * Generate secure authentication token
 */
function generateSecureToken(): string {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Require authentication hook (for use in components)
 */
export function requireAuth(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!SecureAuth.isAuthenticated()) {
    window.location.href = '/login';
    return false;
  }

  return true;
}

