import type React from "react";
import type { ThemeVariant } from "./dashboard.types";

export type DashboardVars = React.CSSProperties & {
  ["--page-bg"]?: string;
  ["--surface"]?: string;
  ["--surface-2"]?: string;
  ["--border"]?: string;
  ["--text"]?: string;
  ["--muted"]?: string;
  ["--primary"]?: string;
  ["--chart"]?: string;
};

export function getDashboardVars(theme: ThemeVariant): DashboardVars {
  if (theme === "dark") {
    return {
      // background + surfaces
      ["--page-bg"]: "8 1 18",
      ["--surface"]: "16 10 28",
      ["--surface-2"]: "24 15 40",

      // readable text
      ["--text"]: "241 243 255",
      ["--muted"]: "170 174 208",

      // borders and accents
      ["--border"]: "255 255 255 / 0.12",
      ["--primary"]: "124 58 237", // purple action
      ["--chart"]: "251 113 133", // pink chart
    };
  }

  // light
  return {
    ["--page-bg"]: "245 246 251",
    ["--surface"]: "255 255 255",
    ["--surface-2"]: "248 250 252",

    ["--text"]: "15 23 42",
    ["--muted"]: "100 116 139",

    ["--border"]: "226 232 240",
    ["--primary"]: "132 204 22", // lime action
    ["--chart"]: "248 113 113", // coral chart
  };
}
