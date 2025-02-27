"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Initialize theme
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    try {
      // Always set to dark theme
      document.documentElement.classList.add("dark");
    } catch (error) {
      console.error("Error setting dark theme:", error);
    }
  }, []);

  // Avoid rendering with incorrect theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
} 