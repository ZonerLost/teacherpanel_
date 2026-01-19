/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
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
      ? "bg-violet-700 text-white hover:bg-violet-800"
      : "bg-orange-500 text-white hover:bg-orange-600";

  // Match screenshot: muted lavender in dark, pale green in light
  const heroBg = theme === "dark" ? "bg-[#b2a6c4]" : "bg-[#cfd7b6]";

  // Placeholder (replace later). Stable random via seed (no hydration flicker).
  const illustrationUrl = React.useMemo(() => {
    // const seed = theme === "dark" ? "reading-race-dark" : "reading-race-light";
    return `/images/chall.png`;
  }, [theme]);

  return (
    <Card
      variant={variant}
      className={cn(
        "overflow-hidden p-0",
        "rounded-[28px] sm:rounded-[34px]",
        heroBg
      )}
    >
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-10">
        {/* Left content */}
        <div className="max-w-[640px]">
          <h2 className="text-2xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-4xl">
            Ignite the Reading Race!
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base">
            Set up exciting reading challenges and foster a love for books in your classroom.
            Watch your students climb the leaderboards!
          </p>

          <div className="mt-5">
            <Button
              variant="ghost"
              onClick={onCreate}
              className={cn(
                primary,
                "rounded-full px-6 py-3  text-sm font-semibold shadow-sm",
                "hover:[shadow-md]"
              )}
            >
              Create New Challenge
            </Button>
          </div>
        </div>

        {/* Right illustration card */}
        <div className="flex w-full justify-end sm:w-auto">
          <div
            className={cn(
              "relative overflow-hidden",
              "h-[150px] w-[220px] sm:h-[175px] sm:w-[260px]",
              "rounded-2xl bg-white",
              "p-4 shadow-sm ring-1 ring-black/5"
            )}
          >
            <img
              src={illustrationUrl}
              alt="Reading challenge illustration"
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
