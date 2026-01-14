import { Card, Button } from "../../../shared/ui";
import { cn } from "../../../shared/utils/cn";

type Props = {
  variant: "surface" | "glass";
  theme: "light" | "dark";
  onCreate: () => void;
};

export function ChallengesHero({ variant, theme, onCreate }: Props) {
  const primary =
    theme === "dark"
      ? "bg-violet-600 text-white hover:bg-violet-700"
      : "bg-orange-500 text-white hover:bg-orange-600";

  // The hero card background in your Figma is a soft green-ish (light) and muted purple (dark)
  const heroBg =
    theme === "dark"
      ? "bg-[rgba(160,140,190,0.22)]"
      : "bg-[rgba(188,210,160,0.45)]";

  return (
    <Card variant={variant} className={cn("overflow-hidden p-0", heroBg)}>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[rgb(var(--text))]">Ignite the Reading Race!</h2>
          <p className="mt-1 max-w-xl text-sm text-[rgb(var(--muted))]">
            Set up exciting reading challenges and foster a love for books in your classroom.
            Watch your students climb the leaderboards!
          </p>

          <div className="mt-4">
            <Button variant="ghost" className={cn(primary)} onClick={onCreate}>
              Create New Challenge
            </Button>
          </div>
        </div>

        {/* Right illustration placeholder (replace with your Figma image later) */}
        <div className="flex h-[92px] w-[130px] items-center justify-center rounded-2xl bg-white/80">
          <div className="h-10 w-10 rounded-full bg-black/10" />
        </div>
      </div>
    </Card>
  );
}
