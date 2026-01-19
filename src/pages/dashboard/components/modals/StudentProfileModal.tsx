import * as React from "react";
import { createPortal } from "react-dom";
import { X, MessageSquare, Plus, Check, Square } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

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
type ProgressRow = { month: string; valueA: number; valueB: number };

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
function buildMockProfile(row: AtRiskRow) {
    // You can replace this with real API later.
    const name = row.student;
    const grade = "Grade 5";
    const section = row.id === "1" ? "Section B" : "Section A";

    const stats = {
        booksRead: 12,
        wordsMastered: 185,
        avgQuiz: 88,
        streak: 7,
    };

    const progress: ProgressRow[] = [
        { month: "Jan", valueA: 1.2, valueB: 140 },
        { month: "Feb", valueA: 1.6, valueB: 180 },
        { month: "Mar", valueA: 1.4, valueB: 210 },
        { month: "Apr", valueA: 2.3, valueB: 260 },
        { month: "May", valueA: 2.0, valueB: 300 },
        { month: "Jun", valueA: 2.8, valueB: 380 },
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

function SectionCard({
    theme,
    children,
    className,
}: {
    theme: ThemeVariant;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-[rgb(var(--border))]",
                theme === "dark"
                    ? "bg-[rgb(var(--surface)_/_0.55)] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
                    : "bg-[rgb(var(--surface))] shadow-[0_12px_40px_rgba(2,12,27,0.06)]",
                className
            )}
        >
            {children}
        </div>
    );
}

function StatTile({
    theme,
    label,
    value,
    icon,
}: {
    theme: ThemeVariant;
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <SectionCard theme={theme} className="p-4">
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "grid h-10 w-10 place-items-center rounded-xl border",
                        theme === "dark"
                            ? "border-white/10 bg-white/5 text-white"
                            : "border-slate-200 bg-slate-50 text-slate-900"
                    )}
                >
                    {icon}
                </div>
                <div>
                    <div className="text-lg font-extrabold text-[rgb(var(--text))]">{value}</div>
                    <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">{label}</div>
                </div>
            </div>
        </SectionCard>
    );
}

function ActivityDot({ theme, on }: { theme: ThemeVariant; on: boolean }) {
    const isDark = theme === "dark";

    // Dark: ON = purple circle + check, OFF = white rounded-square tile + square icon
    if (isDark) {
        if (on) {
            return (
                <div
                    className={cn(
                        "grid h-7 w-7 place-items-center rounded-full",
                        "bg-[#360f90] text-white",
                        "shadow-[0_10px_24px_rgba(124,58,237,0.25)]"
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
                    "shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
                )}
            >
                <Square className="h-4 w-4" />
            </div>
        );
    }

    // Light: orange circles (check vs square) like your screenshot
    return (
        <div
            className={cn(
                "grid h-7 w-7 place-items-center rounded-full",
                "bg-orange-500 text-white",
                "shadow-[0_10px_24px_rgba(249,115,22,0.20)]"
            )}
        >
            {on ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />}
        </div>
    );
}


export function StudentProfileModal({ open, onClose, theme, row }: Props) {
  useEscape(open, onClose);

  const isDark = theme === "dark";
  const accentPrimary = "rgb(var(--primary))";
  const streakColor = isDark ? "#360f90" : "#a4de02";

    const mounted = typeof document !== "undefined";
    const profile = row ? buildMockProfile(row) : null;

    if (!open || !mounted || !profile) return null;

    const grid = isDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";
    const axis = isDark ? "rgba(241,243,255,0.55)" : "rgba(100,116,139,0.85)";

    // Buttons like your screenshots
    const messageBtn = isDark
        ? "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
        : "bg-orange-500 text-white hover:bg-orange-600";

    const assignBtn = isDark
        ? "bg-[rgb(var(--primary))] text-white hover:opacity-90"
        : "bg-[rgb(var(--primary))] text-slate-900 hover:opacity-90";

    const panelClass = cn(
        "w-full max-w-6xl overflow-hidden rounded-3xl border border-[rgb(var(--border))]",
        isDark
            ? "bg-[rgb(var(--surface)_/_0.65)] backdrop-blur-xl shadow-[0_40px_160px_rgba(0,0,0,0.55)]"
            : "bg-[rgb(var(--surface))] shadow-[0_22px_80px_rgba(2,12,27,0.18)]"
    );

    const headerBg = isDark
        ? "bg-gradient-to-r from-[#140026] via-[#1b0532] to-[#140026]"
        : "bg-[#f5f5f5]";

    return createPortal(
        <div className="fixed inset-0  z-[999]">
            {/* overlay */}
            <div
                className={cn("absolute inset-0", isDark ? "bg-black/55" : "bg-black/35")}
                onClick={onClose}
            />

            {/* panel */}
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
                <div
                    className={cn(
                        panelClass,
                        "max-h-[92vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* header */}
                    <div className={cn("px-5 py-4 sm:px-6 sm:py-5", headerBg)}>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 overflow-hidden rounded-full border border-[rgb(var(--border))] bg-white/10">
                                    <img
                                        src="https://i.pravatar.cc/120?img=47"
                                        alt="avatar"
                                        className="h-full w-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>

                                <div>
                                    <div className="text-base font-extrabold text-[rgb(var(--text))] sm:text-lg">
                                        {profile.name}
                                    </div>
                                    <div className="text-xs text-[rgb(var(--muted))]">
                                        {profile.grade} • {profile.section}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center  gap-2">
                                <button
                                    type="button"
                                    className={cn("inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-semibold", messageBtn)}
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Message Parents
                                </button>

                                <button
                                    type="button"
                                    className={cn("inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-semibold", assignBtn)}
                                >
                                    <Plus className="h-4 w-4" />
                                    Assign New Task
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={cn(
                                        "ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border",
                                        isDark
                                            ? "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                    )}
                                    aria-label="Close"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* content */}
                    <div className="p-4 sm:p-6">
                        <div className="grid gap-4 lg:grid-cols-12">
                            {/* LEFT */}
                            <div className="lg:col-span-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <StatTile theme={theme} label="Books Read" value={`${profile.stats.booksRead}`} icon={<span>📚</span>} />
                                    <StatTile
                                        theme={theme}
                                        label="Words Mastered"
                                        value={`${profile.stats.wordsMastered}`}
                                        icon={<span>🔥</span>}
                                    />
                                    <StatTile
                                        theme={theme}
                                        label="Avg. Quiz Score"
                                        value={`${profile.stats.avgQuiz}%`}
                                        icon={<span>🎯</span>}
                                    />
                                    <StatTile theme={theme} label="Current Streak" value={`${profile.stats.streak}`} icon={<span>📅</span>} />
                                </div>

                                <SectionCard theme={theme} className="p-4">
                                    <div className="text-sm font-extrabold text-[rgb(var(--text))]">Vocabulary Mastered</div>
                                    <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">Words saved by the student with definitions.</div>

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
                            <div className="lg:col-span-8 space-y-4">
                                <SectionCard theme={theme} className="p-4">
                                    <div className="text-sm font-extrabold text-[rgb(var(--text))]">
                                        {isDark ? "Reading Progress" : "Reading Progress Overview (Jan - Jun)"}
                                    </div>
                                    <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">
                                        Monthly overview of books and pages read.
                                    </div>

                                    <div className="mt-3 h-[220px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={profile.progress}>
                                                <CartesianGrid stroke={grid} vertical={false} />
                                                <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                                                <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                                                <Tooltip
                                                    contentStyle={{
                                                        background: "rgb(var(--surface))",
                                                        border: "1px solid rgb(var(--border))",
                                                        borderRadius: 16,
                                                    }}
                                                    labelStyle={{ color: "rgb(var(--muted))" }}
                                                />
                                                {/* two lines like your light screenshot */}
                                                <Line type="monotone" dataKey="valueA" stroke={isDark ? accentPrimary : "#84cc16"} strokeWidth={2} dot={false} />
                                                <Line type="monotone" dataKey="valueB" stroke={isDark ? "rgba(241,243,255,0.55)" : "#f97316"} strokeWidth={2} dot={false} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {!isDark ? (
                                        <div className="mt-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))] p-3 text-xs text-[rgb(var(--muted))]">
                                            From January to June, reading pace grew steadily — keep it up!
                                        </div>
                                    ) : (
                                        <div className="mt-3 text-xs text-[rgb(var(--muted))]">Monthly trend for books + pages.</div>
                                    )}
                                </SectionCard>

                                <SectionCard theme={theme} className="p-4">
                                    <div className="text-sm font-extrabold text-[rgb(var(--text))]">Recent Quiz Results</div>
                                    <div className="mt-1 text-[11px] text-[rgb(var(--muted))]">Performance on recent assessments.</div>

                                    <div className="mt-3 overflow-x-auto rounded-2xl border border-[rgb(var(--border))]">
                                        <table className="min-w-[520px] w-full text-left text-xs">
                                            <thead className="bg-[rgb(var(--surface-2))]">
                                                <tr>
                                                    <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">ID</th>
                                                    <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Quiz Name</th>
                                                    <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Score</th>
                                                    <th className="px-3 py-2 text-[11px] font-semibold text-[rgb(var(--muted))]">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profile.quiz.map((q) => (
                                                    <tr key={q.id} className="border-t border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))]/60">
                                                        <td className="px-3 py-2 text-[rgb(var(--text))]">{q.id}</td>
                                                        <td className="px-3 py-2 text-[rgb(var(--text))]/85">{q.name}</td>
                                                        <td className="px-3 py-2 text-[rgb(var(--text))]">{q.score}%</td>
                                                        <td className="px-3 py-2 text-[rgb(var(--text))]/75">{q.date}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </SectionCard>

                                <SectionCard theme={theme} className="px-4 py-6 sm:px-8 sm:py-7">
                                    {/* Title */}
                                    <div className="text-center">
                                        <div className="text-base font-extrabold text-[rgb(var(--text))] sm:text-lg">Reading Streaks</div>
                                        <div className="mt-1 text-[11px] text-[rgb(var(--muted))] sm:text-xs">
                                            Stay motivated with consistent reading!
                                        </div>
                                    </div>

                                    {/* Stats (responsive) */}
                                    <div className="mx-auto mt-5 flex max-w-[560px] flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
                                        {/* Current */}
                                       

<div className="min-w-[180px] text-center sm:text-right">
  <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">Current Streak</div>

  <div className="mt-1 inline-flex items-baseline gap-2">
    <div className="text-3xl font-extrabold" style={{ color: streakColor }}>
      {profile.stats.streak}
    </div>

    <div className="text-xs font-semibold" style={{ color: streakColor }}>
      days
    </div>
  </div>
</div>

                                        {/* Divider */}
                                        <div className="hidden h-12 w-px bg-[rgb(var(--border))] sm:block" />

                                        {/* Longest */}
                                        <div className="min-w-[180px] text-center sm:text-left">
                                            <div className="text-[11px] font-semibold text-[rgb(var(--muted))]">Longest Streak</div>

                                            <div className="mt-1 inline-flex items-baseline gap-2">
                                                <div className="text-3xl font-extrabold text-orange-500">{15}</div>
                                                <div className="text-xs font-semibold text-orange-500">days</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Activity */}
                                    <div className="mt-5 text-center text-[11px] font-semibold text-[rgb(var(--muted))]">
                                        Last 7 Days Activity:
                                    </div>

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
        document.body
    );
}
