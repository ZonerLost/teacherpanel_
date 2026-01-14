export type ThemeVariant = "light" | "dark";

const THEME_KEY = "theme";

export function getTheme(): ThemeVariant {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem(THEME_KEY);
  return saved === "light" || saved === "dark" ? saved : "dark";
}

export function setTheme(theme: ThemeVariant) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
}

export function applyTheme(theme: ThemeVariant) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
}

export function initTheme() {
  if (typeof window === "undefined") return;
  const saved = localStorage.getItem(THEME_KEY);
  const theme: ThemeVariant = saved === "light" || saved === "dark" ? saved : "dark";
  if (!saved) {
    localStorage.setItem(THEME_KEY, theme);
  }
  applyTheme(theme);
}
