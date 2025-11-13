/**
 * Security Utilities for Government Project
 * Comprehensive security functions to prevent XSS, injection attacks, and other vulnerabilities
 */

/**
 * Sanitizes HTML to prevent XSS attacks
 * Removes all potentially dangerous HTML tags and attributes
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove all HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return sanitized;
}

/**
 * Validates and sanitizes user input
 * Prevents injection attacks and ensures data integrity
 */
export function sanitizeInput(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // Limit length to prevent DoS
  const MAX_LENGTH = 10000;
  if (sanitized.length > MAX_LENGTH) {
    sanitized = sanitized.substring(0, MAX_LENGTH);
  }

  return sanitized;
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = sanitizeInput(email);
  
  return emailRegex.test(sanitized) && sanitized.length <= 254;
}

/**
 * Validates EPIC number format (alphanumeric, specific pattern)
 */
export function validateEpicNumber(epic: string): boolean {
  if (!epic || typeof epic !== 'string') {
    return false;
  }

  const sanitized = sanitizeInput(epic);
  // EPIC format: 3 letters + 7 digits (e.g., SOK1234563)
  const epicRegex = /^[A-Z]{3}\d{7}$/i;
  
  return epicRegex.test(sanitized) && sanitized.length <= 10;
}

/**
 * Validates serial number (numeric)
 */
export function validateSerialNumber(serial: string): boolean {
  if (!serial || typeof serial !== 'string') {
    return false;
  }

  const sanitized = sanitizeInput(serial);
  const serialRegex = /^\d+$/;
  
  return serialRegex.test(sanitized) && sanitized.length <= 20;
}

/**
 * Validates part number (numeric)
 */
export function validatePartNumber(part: string): boolean {
  if (!part || typeof part !== 'string') {
    return false;
  }

  const sanitized = sanitizeInput(part);
  const partRegex = /^\d+$/;
  
  return partRegex.test(sanitized) && sanitized.length <= 10;
}

/**
 * Validates name (letters, spaces, and common name characters)
 */
export function validateName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const sanitized = sanitizeInput(name);
  // Allow letters, spaces, hyphens, apostrophes, and dots
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  
  return nameRegex.test(sanitized) && sanitized.length >= 1 && sanitized.length <= 100;
}

/**
 * Validates age (numeric, reasonable range)
 */
export function validateAge(age: string): boolean {
  if (!age || typeof age !== 'string') {
    return false;
  }

  const sanitized = sanitizeInput(age);
  const ageNum = parseInt(sanitized, 10);
  
  return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 120;
}

/**
 * Validates ward number (numeric)
 */
export function validateWardNumber(ward: string): boolean {
  if (!ward || typeof ward !== 'string') {
    return false;
  }

  const sanitized = sanitizeInput(ward);
  const wardRegex = /^\d+$/;
  
  return wardRegex.test(sanitized) && sanitized.length <= 10;
}

/**
 * Validates assembly number (numeric)
 */
export function validateAssemblyNumber(assembly: string): boolean {
  if (!assembly || typeof assembly !== 'string') {
    return false;
  }

  const sanitized = sanitizeInput(assembly);
  const assemblyRegex = /^\d+$/;
  
  return assemblyRegex.test(sanitized) && sanitized.length <= 10;
}

/**
 * Rate limiting utility for client-side protection
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const recentRequests = requests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

/**
 * CSRF Token Generator and Validator
 */
export class CSRFProtection {
  private static readonly TOKEN_LENGTH = 32;
  private static readonly TOKEN_STORAGE_KEY = 'csrf_token';
  private static readonly TOKEN_EXPIRY = 3600000; // 1 hour

  /**
   * Generate a CSRF token
   */
  static generateToken(): string {
    const array = new Uint8Array(this.TOKEN_LENGTH);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(array);
    } else {
      // Fallback for environments without crypto
      for (let i = 0; i < this.TOKEN_LENGTH; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    
    if (typeof window !== 'undefined') {
      const tokenData = {
        token,
        expiry: Date.now() + this.TOKEN_EXPIRY,
      };
      sessionStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
    }
    
    return token;
  }

  /**
   * Get current CSRF token
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const stored = sessionStorage.getItem(this.TOKEN_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    try {
      const tokenData = JSON.parse(stored);
      if (Date.now() > tokenData.expiry) {
        sessionStorage.removeItem(this.TOKEN_STORAGE_KEY);
        return null;
      }
      return tokenData.token;
    } catch {
      return null;
    }
  }

  /**
   * Validate CSRF token
   */
  static validateToken(token: string): boolean {
    const storedToken = this.getToken();
    return storedToken !== null && storedToken === token;
  }

  /**
   * Clear CSRF token
   */
  static clearToken(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.TOKEN_STORAGE_KEY);
    }
  }
}

/**
 * Secure storage utility (wrapper for localStorage with encryption considerations)
 */
export class SecureStorage {
  private static readonly PREFIX = 'secure_';

  /**
   * Store data securely
   */
  static setItem(key: string, value: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const sanitizedKey = sanitizeInput(key);
      const sanitizedValue = sanitizeInput(value);
      localStorage.setItem(`${this.PREFIX}${sanitizedKey}`, sanitizedValue);
    } catch (error) {
      console.error('SecureStorage: Failed to set item', error);
    }
  }

  /**
   * Get data securely
   */
  static getItem(key: string): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const sanitizedKey = sanitizeInput(key);
      return localStorage.getItem(`${this.PREFIX}${sanitizedKey}`);
    } catch (error) {
      console.error('SecureStorage: Failed to get item', error);
      return null;
    }
  }

  /**
   * Remove data securely
   */
  static removeItem(key: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const sanitizedKey = sanitizeInput(key);
      localStorage.removeItem(`${this.PREFIX}${sanitizedKey}`);
    } catch (error) {
      console.error('SecureStorage: Failed to remove item', error);
    }
  }

  /**
   * Clear all secure storage
   */
  static clear(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('SecureStorage: Failed to clear', error);
    }
  }
}

/**
 * Safe render function - prevents XSS when rendering user data
 */
export function safeRender(data: string | null | undefined): string {
  if (!data) {
    return '';
  }
  return sanitizeHtml(String(data));
}

