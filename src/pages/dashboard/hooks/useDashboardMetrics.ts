import * as React from "react";
import type { MetricKey, MetricToggle } from "../dashboard.types";

const STORAGE_KEY = "dashboard:metrics:v1";

const DEFAULT_ENABLED: Record<MetricKey, boolean> = {
  avgComprehension: true,
  vocabEngagement: true,
  readingDistribution: true,
  readingConsistency: true,
  atRiskFlags: true,
  topPerformers: true,
  classGrowth: true,
  leaderboard: true,
};

export function useDashboardMetrics() {
  const [enabled, setEnabled] = React.useState<Record<MetricKey, boolean>>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_ENABLED;
      const parsed = JSON.parse(raw) as Partial<Record<MetricKey, boolean>>;
      return { ...DEFAULT_ENABLED, ...parsed };
    } catch {
      return DEFAULT_ENABLED;
    }
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(enabled));
    } catch {
      // ignore storage failures
    }
  }, [enabled]);

  const setMetric = React.useCallback((key: MetricKey, checked: boolean) => {
    setEnabled((prev) => ({ ...prev, [key]: checked }));
  }, []);

  const toggles: MetricToggle[] = React.useMemo(
    () => [
      { key: "avgComprehension", label: "Avg. Comprehension Score", valueText: "78%" },
      { key: "vocabEngagement", label: "Vocabulary Engagement" },
      { key: "readingDistribution", label: "Reading Distribution by Genre" },
      { key: "readingConsistency", label: "Reading Consistency Score" },
      { key: "atRiskFlags", label: "At-Risk Flags" },
      { key: "topPerformers", label: "Top Performers & Encouragement" },
      { key: "classGrowth", label: "Class Growth Over Time" },
      { key: "leaderboard", label: "Student Reading Leaderboard" },
    ],
    []
  );

  return { toggles, enabled, setMetric };
}
