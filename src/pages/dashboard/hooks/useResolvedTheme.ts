import { useTheme, type ThemeVariant } from "../../../shared/theme/useTheme";

export function useResolvedTheme(): ThemeVariant {
  const { theme } = useTheme();
  return theme;
}
