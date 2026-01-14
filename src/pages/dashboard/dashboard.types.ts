export type ThemeVariant = "light" | "dark";

export type MetricKey =
  | "avgComprehension"
  | "vocabEngagement"
  | "readingDistribution"
  | "readingConsistency"
  | "atRiskFlags"
  | "topPerformers"
  | "classGrowth"
  | "leaderboard";

export type MetricToggle = {
  key: MetricKey;
  label: string;
  valueText?: string; // e.g. "88%"
};

export type AtRiskRow = {
  id: string;
  student: string;
  riskFactor: string;
  flag: "High" | "Medium" | "Low";
};

export type Performer = {
  name: string;
  subtitle: string;
  badge: string;
};

export type LeaderboardRow = {
  rank: number;
  student: string;
  score: number;
};
