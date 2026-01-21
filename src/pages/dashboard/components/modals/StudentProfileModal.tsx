import * as React from "react";
import { createPortal } from "react-dom";
import {
  X,
  MessageSquare,
  Plus,
  Check,
  Square,
  BookOpen,
  Brain,
  GraduationCap,
  CalendarCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { cn } from "../../../../shared/utils/cn";
import type { AtRiskRow, ThemeVariant } from "../../dashboard.types";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: ThemeVariant;
  variant: "surface" | "glass";
  row: AtRiskRow | null;
};

type QuizRow = { id: string; name: string; score: number; date: string };
type VocabRow = { word: string; meaning: string; example: string };
type ProgressRow = { month: string; books: number; pages: number };

function useEscape(open: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
}

function useLockBodyScroll(open: boolean) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
}

function buildMockProfile(row: AtRiskRow) {
  const name = row.student;
  const grade = "Grade 5";
  const section = row.id === "1" ? "Section B" : "Section A";

  const stats = {
    booksRead: 12,
    wordsMastered: 185,
    avgQuiz: 88,
    streak: 7,
    longestStreak: 15,
  };

  const progress: ProgressRow[] = [
    { month: "Jan", books: 2, pages: 120 },
    { month: "Feb", books: 3, pages: 160 },
    { month: "Mar", books: 2, pages: 190 },
    { month: "Apr", books: 4, pages: 240 },
    { month: "May", books: 3, pages: 285 },
    { month: "Jun", books: 5, pages: 420 },
  ];

  const vocab: VocabRow[] = [
    {
      word: "Ephemeral",
      meaning: "Lasting for a very short time.",
      example: "The ephemerality of the sunset made it unforgettable.",
    },
    {
      word: "Serendipity",
      meaning: "A happy or beneficial event by chance.",
      example: "Meeting my mentor was pure serendipity.",
    },
    {
      word: "Ubiquitous",
      meaning: "Present or found everywhere.",
      example: "Smartphones are ubiquitous today.",
    },
    {
      word: "Mellifluous",
      meaning: "Sweet or musical; pleasant to hear.",
      example: "Her mellifluous voice captivated the audience.",
    },
  ];

  const quiz: QuizRow[] = [
    { id: "Q001", name: "Grammar Basics", score: 92, date: "2024-06-10" },
    { id: "Q002", name: "Vocabulary Unit 1", score: 85, date: "2024-06-05" },
    { id: "Q003", name: "Reading Comprehension", score: 78, date: "2024-05-28" },
    { id: "Q004", name: "Story Elements", score: 95, date: "2024-05-20" },
    { id: "Q005", name: "Poetry Analysis", score: 80, date: "2024-05-15" },
  ];

  return { name, grade, section, stats, progress, vocab, quiz };
}

function surfaceClasses(theme: ThemeVariant, variant: "surface" | "glass") {
  const isDark = theme === "dark";

  if (variant === "glass") {
    return isDark
      ? "bg-[rgb(var(--surface)_/_0.65)] backdrop-blur-xl shadow-[0_40px_160px_rgba(0,0,0,0.55)]"
      : "bg-[rgb(var(--surface)_/_0.85)] backdrop-blur-xl shadow-[0_22px_80px_rgba(2,12,27,0.18)]";
  }

  return isDark
    ? "bg-[rgb(var(--surface))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
    : "bg-[rgb(var(--surface))] shadow-[0_22px_80px_rgba(2,12,27,0.14)]";
}

function SectionCard({
  theme,
  variant,
  children,
  className,
}: {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-2xl border border-[rgb(var(--border))]",
        theme === "dark"
          ? variant === "glass"
            ? "bg-[rgb(var(--surface)_/_0.55)] backdrop-blur-xl"
            : "bg-[rgb(var(--surface))]"
          : variant === "glass"
            ? "bg-[rgb(var(--surface)_/_0.9)]"
            : "bg-[rgb(var(--surface))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type StatTone = "purple" | "orange";

function StatTile({
  theme,
  variant,
  label,
  value,
  icon,
  tone = "purple",
}: {
  theme: ThemeVariant;
  variant: "surface" | "glass";
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: StatTone;
}) {
  const isDark = theme === "dark";

  const iconCls =
    tone === "purple"
      ? isDark
        ? "text-violet-400"
        : "text-[#5b21b6]"
      : isDark
        ? "text-orange-400"
        : "text-[#f97316]";

  const tileCls = cn(
    "relative min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border",
    "px-4 py-5 sm:px-7 sm:py-8",
    "flex flex-col items-center justify-center text-center",
    "min-h-[116px] sm:min-h-[150px]",
    isDark
      ? cn(
          "border-white/10",
          variant === "glass" ? "bg-white/5 backdrop-blur-xl" : "bg-[rgb(var(--surface))]",
          "shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
        )
      : cn("border-slate-200", "bg-[#f3f4f6]", "shadow-[0_14px_40px_rgba(2,12,27,0.08)]"),
  );

  return (
    <div className={tileCls}>
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(600px_circle_at_50%_0%,rgba(124,58,237,0.22),transparent_55%)]"
            : "bg-[radial-gradient(600px_circle_at_50%_0%,rgba(2,12,27,0.06),transparent_55%)]",
        )}
      />

      <div className="relative grid place-items-center">
        <div className={cn("mb-3 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center", iconCls)}>{icon}</div>

        <div className={cn("text-3xl font-extrabold leading-none sm:text-4xl", "text-[rgb(var(--text))]")}>
          {value}
        </div>

        <div className={cn("mt-2 text-xs font-medium sm:text-base", "text-[rgb(var(--muted))]")}>{label}</div>
      </div>
    </div>
  );
}

function ActivityDot({ theme, on }: { theme: ThemeVariant; on: boolean }) {
  const isDark = theme === "dark";

  if (isDark) {
    if (on) {
      return (
        <div
          className={cn(
            "grid h-7 w-7 place-items-center rounded-full",
            "bg-[#360f90] text-white",
            "shadow-[0_10px_24px_rgba(124,58,237,0.25)]",
          )}
        >
          <Check className="h-4 w-4" />
        </div>
      );
    }

    return (
      <div
        className={cn(
          "grid h-7 w-7 place-items-center rounded-lg",
          "bg-white text-slate-900",
          "border border-black/10",
          "shadow-[0_10px_20px_rgba(0,0,0,0.18)]",
        )}
      >
        <Square className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid h-7 w-7 place-items-center rounded-full",
        "bg-orange-500 text-white",
        "shadow-[0_10px_24px_rgba(249,115,22,0.20)]",
      )}
    >
      {on ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />}
    </div>
  );
}

function formatNumber(n: number) {
  return new Intl.NumberFormat().format(n);
}

export function StudentProfileModal({ open, onClose, theme, variant, row }: Props) {
  useEscape(open, onClose);
  useLockBodyScroll(open);

  const isDark = theme === "dark";
  const streakColor = isDark ? "#360f90" : "#a4de02";

  const mounted = typeof document !== "undefined";
  const profile = React.useMemo(() => (row ? buildMockProfile(row) : null), [row]);

  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
  }, [open]);

  if (!open || !mounted || !profile) return null;

  const grid = isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";
  const axis = isDark ? "rgba(241,243,255,0.55)" : "rgba(100,116,139,0.85)";

  const messageBtn = isDark
    ? "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
    : "bg-orange-500 text-white hover:bg-orange-600";

  const assignBtn = isDark
    ? "bg-[rgb(var(--primary))] text-white hover:opacity-90"
    : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50";

  const headerBg = isDark
    ? "bg-gradient-to-r from-[#140026] via-[#1b0532] to-[#140026]"
    : "bg-[#f5f5f5]";

  const panelClass = cn(
    "flex min-h-0 flex-col overflow-hidden border border-[rgb(var(--border))]",
    "w-full h-full rounded-none",
    "sm:rounded-3xl sm:h-[min(92vh,980px)] ",
   
    surfaceClasses(theme, variant),
  );

  // Reading insights calculations
  const avgWordsPerPage = 250;
  const totalPages = profile.progress.reduce((sum, r) => sum + r.pages, 0);
  const totalWords = totalPages * avgWordsPerPage;
  const mostProductive = profile.progress.reduce(
    (best, r) => (r.pages > best.pages ? r : best),
    profile.progress[0],
  );

  const insightBox = cn(
    "rounded-2xl p-3",
    isDark ? "border border-white/10 bg-white/5" : "border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]",
  );

  const booksStroke = isDark ? "rgba(124,58,237,0.75)" : "#84cc16";
  const pagesStroke = isDark ? "rgba(241,243,255,0.70)" : "#f97316";

  return createPortal(
    <div className="fixed inset-0 z-[999]">
      {/* overlay */}
      <div className={cn("absolute inset-0", isDark ? "bg-black/55" : "bg-black/35")} onClick={onClose} />

      {/* container (center on tablet/laptop) */}
      <div className="absolute inset-0 flex items-stretch justify-stretch p-0 sm:items-center sm:justify-center sm:p-4 md:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Student profile"
          className={panelClass}
          onClick={(e) => e.stopPropagation()}
        >
          {/* header (sticky) */}
          <div className={cn("sticky top-0 z-20 px-4 py-3 sm:px-6 sm:py-5", headerBg)}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-11 w-11 sm:h-12 sm:w-12 overflow-hidden rounded-full border border-[rgb(var(--border))] bg-white/10">
                  <img
                    src="https://i.pravatar.cc/120?img=47"
                    alt="avatar"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-base font-extrabold text-[rgb(var(--text))] sm:text-lg">{profile.name}</div>
                  <div className="truncate text-xs text-[rgb(var(--muted))]">
                    {profile.grade} • {profile.section}
                  </div>
                </div>
              </div>

              {/* actions (wrap on small screens) */}
              <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:flex-nowrap">
                <button
                  type="button"
                  className={cn("inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-semibold max-[420px]:px-2", messageBtn)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden md:inline">Message Parents</span>
                </button>

                <button
                  type="button"
                  className={cn("inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-semibold max-[420px]:px-2", assignBtn)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:inline">Assign New Task</span>
                </button>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl border",
                    isDark
                      ? "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* scrollable content */}
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 md:p-7 lg:p-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* ✅ md grid = tablet layout, lg refines */}
            <div className="grid gap-4 md:gap-6 md:grid-cols-12">
              {/* LEFT */}
              <div className="min-w-0 space-y-4 md:col-span-5 lg:col-span-4">
                {/* ✅ stat tiles responsive */}
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 sm:gap-4">
                  <StatTile theme={theme} variant={variant} label="Books Read" value={`${profile.stats.booksRead}`} tone="purple" icon={<BookOpen className="h-8 w-8" />} />
                  <StatTile theme={theme} variant={variant} label="Words Mastered" value={`${profile.stats.wordsMastered}`} tone="orange" icon={<Brain className="h-8 w-8" />} />
                  <StatTile theme={theme} variant={variant} label="Avg. Quiz Score" value={`${profile.stats.avgQuiz}%`} tone="purple" icon={<GraduationCap className="h-8 w-8" />} />
                  <StatTile theme={theme} variant={variant} label="Current Streak" value={`${profile.stats.streak}`} tone="orange" icon={<CalendarCheck className="h-8 w-8" />} />
                </div>

                {/* ✅ vocab stays readable on all widths */}
                <SectionCard theme={theme} variant={variant} className="p-4">
                  <div className="text-sm font-extrabold text-[rgb(var(--text))]">Vocabulary Mastered</div>
                  <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">
                    Words saved by the student with definitions.
                  </div>

                  <div className="mt-3 divide-y divide-[rgb(var(--border))]">
                    {profile.vocab.map((v) => (
                      <div key={v.word} className="py-3">
                        <div className="text-xs font-bold text-[rgb(var(--text))]">{v.word}</div>
                        <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">{v.meaning}</div>
                        <div className="mt-2 text-[11px] text-[rgb(var(--text))]/80">
                          <span className="font-semibold text-[rgb(var(--muted))]">Example: </span>
                          {v.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              {/* RIGHT */}
              <div className="min-w-0 space-y-4 md:col-span-7 lg:col-span-8">
                <SectionCard theme={theme} variant={variant} className="p-4">
                  <div className="text-sm font-extrabold text-[rgb(var(--text))]">
                    {isDark ? "Reading Progress" : "Reading Progress Overview (Jan - Jun)"}
                  </div>
                  <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">Monthly overview of books and pages read.</div>

                  {/* ✅ Chart + Insights responsive split (tablet: 8/4, laptop: 9/3) */}
                  <div className="mt-3 grid gap-4 md:grid-cols-12">
                    <div className="min-w-0 w-full h-[220px] sm:h-[240px] md:h-[280px] lg:h-[300px] md:col-span-8 lg:col-span-9">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={profile.progress}>
                          <CartesianGrid stroke={grid} vertical={false} strokeDasharray={isDark ? "3 3" : undefined} />
                          <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis
                            yAxisId="books"
                            tick={{ fill: axis, fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={28}
                            domain={[0, "dataMax + 1"]}
                          />
                          <YAxis
                            yAxisId="pages"
                            orientation="right"
                            tick={{ fill: axis, fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={36}
                            domain={[0, "dataMax + 40"]}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "rgb(var(--surface))",
                              border: "1px solid rgb(var(--border))",
                              borderRadius: 16,
                            }}
                            labelStyle={{ color: "rgb(var(--muted))" }}
                          />
                          <Line yAxisId="books" type="monotone" dataKey="books" stroke={booksStroke} strokeWidth={2} dot={false} />
                          <Line yAxisId="pages" type="monotone" dataKey="pages" stroke={pagesStroke} strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <SectionCard
                      theme={theme}
                      variant={variant}
                      className={cn(
                        "min-w-0 p-4 md:col-span-4 lg:col-span-3",
                        variant === "glass" ? "backdrop-blur-xl" : "",
                        isDark ? "shadow-[0_18px_40px_rgba(0,0,0,0.32)]" : "",
                      )}
                    >
                      <div className="text-xs font-extrabold text-[rgb(var(--text))]">Reading Insights</div>

                      <div className="mt-3 space-y-3">
                        <div className={insightBox}>
                          <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">Avg Words Per Page</div>
                          <div className="mt-1 text-sm font-extrabold text-[rgb(var(--text))]">{avgWordsPerPage}</div>
                        </div>

                        <div className={insightBox}>
                          <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">Total Words Read (Jan - Jun)</div>
                          <div className="mt-1 text-sm font-extrabold text-[rgb(var(--text))]">{formatNumber(totalWords)}</div>
                        </div>

                        <div className={insightBox}>
                          <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">Most productive month</div>
                          <div className="mt-1 text-sm font-extrabold text-[rgb(var(--text))]">{mostProductive.month}</div>
                          <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">
                            {mostProductive.books} Books, {mostProductive.pages} pages
                          </div>
                        </div>
                      </div>
                    </SectionCard>
                  </div>

                  {!isDark ? (
                    <div className="mt-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3 text-xs text-[rgb(var(--muted))]">
                      From January to June, reading pace grew steadily — keep it up!
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-[rgb(var(--muted))]">Monthly trend for books + pages.</div>
                  )}
                </SectionCard>

                {/* ✅ quiz table: hides Date on tiny screens (no forced horizontal scroll) */}
                <SectionCard theme={theme} variant={variant} className="p-4">
                  <div className="text-sm font-extrabold text-[rgb(var(--text))]">Recent Quiz Results</div>
                  <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">Performance on recent assessments.</div>

                  <div className="mt-3 overflow-x-auto rounded-2xl border border-[rgb(var(--border))]">
                    <table className="w-full min-w-[440px] sm:min-w-[560px] text-left text-xs">
                      <thead className="bg-[rgb(var(--surface-2))]">
                        <tr>
                          <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">ID</th>
                          <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Quiz Name</th>
                          <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Score</th>
                          <th className="hidden sm:table-cell px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.quiz.map((q) => (
                          <tr
                            key={q.id}
                            className="border-t border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))]/60"
                          >
                            <td className="px-3 py-2 text-[rgb(var(--text))]">{q.id}</td>
                            <td className="px-3 py-2 text-[rgb(var(--text))]/85">{q.name}</td>
                            <td className="px-3 py-2 text-[rgb(var(--text))]">{q.score}%</td>
                            <td className="hidden sm:table-cell px-3 py-2 text-[rgb(var(--text))]/75">{q.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              </div>

              {/* FULL-WIDTH bottom */}
              <div className="md:col-span-12">
                <SectionCard theme={theme} variant={variant} className="px-4 py-6 sm:px-8 sm:py-7">
                  <div className="text-center">
                    <div className="text-base font-extrabold text-[rgb(var(--text))] sm:text-lg">Reading Streaks</div>
                    <div className="mt-1 text-[11px] text-[rgb(var(--muted))] sm:text-xs">
                      Stay motivated with consistent reading!
                    </div>
                  </div>

                  {/* ✅ streak block responsive (mobile stack, tablet+ 3 columns with divider) */}
                  <div className="mx-auto mt-5 grid w-full max-w-[720px] grid-cols-1 items-center justify-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-10">
                    <div className="text-center sm:text-right">
                      <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">Current Streak</div>
                      <div className="mt-1 inline-flex items-baseline justify-center gap-2 sm:justify-end">
                        <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: streakColor }}>
                          {profile.stats.streak}
                        </div>
                        <div className="text-xs font-semibold" style={{ color: streakColor }}>
                          days
                        </div>
                      </div>
                    </div>

                    <div className="hidden h-12 w-px bg-[rgb(var(--border))] sm:block" />

                    <div className="text-center sm:text-left">
                      <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">Longest Streak</div>
                      <div className="mt-1 inline-flex items-baseline justify-center gap-2 sm:justify-start">
                        <div className="text-2xl sm:text-3xl font-extrabold text-orange-500">{profile.stats.longestStreak}</div>
                        <div className="text-xs font-semibold text-orange-500">days</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-center text-[11px] font-semibold text-[rgb(var(--muted))]">Last 7 Days Activity:</div>

                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {[1, 1, 1, 0, 1, 1, 0].map((v, i) => (
                      <ActivityDot key={i} theme={theme} on={!!v} />
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
