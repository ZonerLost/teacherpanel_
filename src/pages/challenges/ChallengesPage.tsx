import React from "react";

import { useResolvedTheme } from "../dashboard/hooks/useResolvedTheme";
import type { Challenge } from "./challenges.types";
import { initialAchievements, initialChallenges, leaderboardDatasets } from "./challenges.data";
import { ChallengesHero } from "./components/ChallengesHero";
import { OngoingChallenges } from "./components/OngoingChallenges";
import { LeaderboardSection } from "./components/LeaderboardSection";
import { RecentAchievements } from "./components/RecentAchievements";
import { CreateChallengeModal } from "./components/modals/CreateChallengeModal";
import { ChallengeDetailsModal } from "./components/modals/ChallengeDetailsModal";
import { ModuleFooter } from "../../shared/components/ModuleFooter";
export default function ChallengesPage() {
  const theme = useResolvedTheme();
  const variant = theme === "dark" ? "glass" : "surface";

  const [challenges, setChallenges] = React.useState<Challenge[]>(initialChallenges);

  // leaderboard
  const [lbKey, setLbKey] = React.useState<string>(leaderboardDatasets[0]?.key ?? "spring");
  const dataset = React.useMemo(
    () => leaderboardDatasets.find((d) => d.key === lbKey) ?? leaderboardDatasets[0],
    [lbKey]
  );

  // modals
  const [createOpen, setCreateOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [activeChallenge, setActiveChallenge] = React.useState<Challenge | null>(null);

  const openDetails = (c: Challenge) => {
    setActiveChallenge(c);
    setDetailsOpen(true);
  };

  const createChallenge = (c: Challenge) => {
    setChallenges((prev) => [c, ...prev]);
  };

  const markCompleted = (id: string) => {
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, status: "completed", progressPct: 100 } : c)));
    setDetailsOpen(false);
  };

  return (
    <div className="space-y-4">
      <ChallengesHero variant={variant} theme={theme} onCreate={() => setCreateOpen(true)} />

      <OngoingChallenges
        variant={variant}
        theme={theme}
        challenges={challenges}
        onViewDetails={openDetails}
      />

      <LeaderboardSection
        variant={variant}
        dataset={dataset}
        options={leaderboardDatasets}
        onChangeKey={setLbKey}
        theme={theme}
      />

      <RecentAchievements variant={variant} achievements={initialAchievements} />

      {/* Footer (same as your other modules) */}
      <div className="flex items-center justify-between border-t border-[rgb(var(--border))] pt-3 text-xs text-[rgb(var(--muted))]">
    <ModuleFooter
            theme={theme}
            className="w-full"
            containerClassName="max-w-screen-2xl"
          />
      </div>

      {/* Modals */}
      <CreateChallengeModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        theme={theme}
        onCreate={createChallenge}
      />

      <ChallengeDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        challenge={activeChallenge}
        onMarkCompleted={markCompleted}
      />
    </div>
  );
}
