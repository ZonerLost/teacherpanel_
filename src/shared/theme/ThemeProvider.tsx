/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { applyTheme, getTheme, setTheme as persistTheme, type ThemeVariant } from "../../core/theme/theme";
export type { ThemeVariant } from "../../core/theme/theme";

type ThemeContextValue = {
  theme: ThemeVariant;
  setTheme: (t: ThemeVariant) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function readInitialTheme(): ThemeVariant {
  const initial = getTheme();
  applyTheme(initial);
  return initial;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeVariant>(readInitialTheme);

  const setTheme = React.useCallback((t: ThemeVariant) => {
    setThemeState(t);
    persistTheme(t);
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
