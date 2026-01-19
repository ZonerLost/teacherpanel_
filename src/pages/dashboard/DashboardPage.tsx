import React from "react";
import { MetricsToggleBar } from "./components/MetricsToggleBar";
import { useDashboardMetrics } from "./hooks/useDashboardMetrics";
import { useResolvedTheme } from "./hooks/useResolvedTheme";
import { getDashboardVars } from "./dashboard.tokens";
import {
  DASHBOARD_DEFAULT_CLASS,
  CLASSES,
  type ClassName,
  comprehensionTrend,
  vocabularyBars,
  genreDistribution,
  consistencyTrend,
  classGrowthTrend,
  atRiskRows,
  topPerformers,
  leaderboardRows,
} from "./dashboard.data";
import { ModuleFooter } from "../../shared/components/ModuleFooter";
import { AverageComprehensionCard } from "./components/cards/AverageComprehensionCard";
import { VocabularyEngagementCard } from "./components/cards/VocabularyEngagementCard";
import { ReadingDistributionCard } from "./components/cards/ReadingDistributionCard";
import { ReadingConsistencyCard } from "./components/cards/ReadingConsistencyCard";
import { AtRiskFlagsCard } from "./components/cards/AtRiskFlagsCard";
import { TopPerformersCard } from "./components/cards/TopPerformersCard";
import { ClassGrowthCard } from "./components/cards/ClassGrowthCard";
import { StudentLeaderboardCard } from "./components/cards/StudentLeaderboardCard";

function pickByClass<T>(all: T[], classValue: ClassName) {
  // ✅ demo filter behavior (replace with real backend filter later)
  if (classValue === "All students") return all;

  // stable slicing per class
  const idx = Math.max(1, CLASSES.indexOf(classValue));
  const size = Math.max(2, Math.min(all.length, 2 + (idx % 3))); // 2..4 items
  return all.slice(0, size);
}

export default function DashboardPage() {
  const theme = useResolvedTheme();
  const cardVariant = theme === "dark" ? "glass" : "surface";
  const vars = React.useMemo(() => getDashboardVars(theme), [theme]);

  const [classValue, setClassValue] = React.useState<ClassName>(DASHBOARD_DEFAULT_CLASS);
  const { toggles, enabled, setMetric } = useDashboardMetrics();

  // ✅ apply filter (demo)
  const filteredAtRisk = React.useMemo(() => pickByClass(atRiskRows, classValue), [classValue]);
  const filteredPerformers = React.useMemo(() => pickByClass(topPerformers, classValue), [classValue]);
  const filteredLeaderboard = React.useMemo(() => pickByClass(leaderboardRows, classValue), [classValue]);

  return (
    <section style={vars} className="relative rounded-3xl bg-[rgb(var(--page-bg))] p-4 md:p-6">
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 opacity-0 dark:opacity-100">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -right-44 top-10 h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute right-10 -bottom-48 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="absolute inset-0 opacity-100 dark:opacity-0">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute -right-44 top-10 h-[520px] w-[520px] rounded-full bg-lime-400/10 blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 space-y-5">
        <MetricsToggleBar
          title="Choose Metrics to Display"
          toggles={toggles}
          enabled={enabled}
          onToggle={setMetric}
          classValue={classValue}
          onClassChange={setClassValue}
          classOptions={CLASSES}
        />

        {/* ✅ Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {enabled.avgComprehension && (
            <AverageComprehensionCard theme={theme} variant={cardVariant} valuePct={78} data={comprehensionTrend} />
          )}

          {enabled.vocabEngagement && (
            <VocabularyEngagementCard theme={theme} variant={cardVariant} data={vocabularyBars} />
          )}

          {enabled.readingDistribution && (
            <ReadingDistributionCard theme={theme} variant={cardVariant} data={genreDistribution} />
          )}

          {enabled.readingConsistency && (
            <ReadingConsistencyCard theme={theme} variant={cardVariant} data={consistencyTrend} />
          )}

          {enabled.atRiskFlags && (
            <AtRiskFlagsCard theme={theme} variant={cardVariant} rows={filteredAtRisk} />
          )}

          {enabled.topPerformers && (
            <TopPerformersCard theme={theme} variant={cardVariant} performers={filteredPerformers} />
          )}

          {enabled.classGrowth && (
            <ClassGrowthCard theme={theme} variant={cardVariant} data={classGrowthTrend} />
          )}

          {enabled.leaderboard && (
            <StudentLeaderboardCard theme={theme} variant={cardVariant} rows={filteredLeaderboard} />
          )}
  
        </div>
          <ModuleFooter
        theme={theme}
        className="w-full"
        containerClassName="max-w-screen-2xl"
      />
      </div>
    </section>
  );
}
