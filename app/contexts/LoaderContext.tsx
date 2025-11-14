"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LoaderContextValue = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  triggerLoader: (duration?: number) => void;
};

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideLoader = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const showLoader = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(true);
  }, []);

  const triggerLoader = useCallback(
    (duration = 900) => {
      showLoader();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        hideLoader();
      }, duration);
    },
    [hideLoader, showLoader]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LoaderContext.Provider
      value={{ isLoading, showLoader, hideLoader, triggerLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}

