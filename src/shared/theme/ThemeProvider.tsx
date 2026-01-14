/* eslint-disable react-refresh/only-export-components */
import React from "react";

export type ThemeVariant = "light" | "dark";

const THEME_KEY = "teacher_panel_theme";

type ThemeContextValue = {
  theme: ThemeVariant;
  setTheme: (t: ThemeVariant) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function applyTheme(t: ThemeVariant) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  root.classList.toggle("dark", t === "dark");
}

function readInitialTheme(): ThemeVariant {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(THEME_KEY);
  const initial = saved === "dark" || saved === "light" ? saved : "light";
  applyTheme(initial);
  return initial;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeVariant>(readInitialTheme);

  const setTheme = React.useCallback((t: ThemeVariant) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
    applyTheme(t);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used inside ThemeProvider");
  return ctx;
}
