import { Card } from "../../../shared/ui";
import type { Challenge } from "../challenges.types";
import { ChallengeCard } from "./ChallengeCard";

type Props = {
  variant: "surface" | "glass";
  theme: "light" | "dark";
  challenges: Challenge[];
  onViewDetails: (c: Challenge) => void;
};

export function OngoingChallenges({ variant, theme, challenges, onViewDetails }: Props) {
  return (
    <Card variant={variant} className="p-5">
      <div className="text-sm font-extrabold text-[rgb(var(--text))]">Ongoing Reading Challenges</div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {challenges.map((c) => (
          <ChallengeCard key={c.id} challenge={c} theme={theme} onViewDetails={onViewDetails} />
        ))}
      </div>
    </Card>
  );
}
