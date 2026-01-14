import React from "react";
import { NavLink } from "react-router-dom";
import { Bell, Menu, Search, X } from "lucide-react";
import { ThemeToggleButton } from "../../shared/ui";
import { useTheme } from "../../shared/theme/useTheme";
import type { NavItem } from "./navItems";

type TeacherTopbarProps = {
  navItems: NavItem[];

  showNavLinksOnDesktop?: boolean;

  onLogout?: () => void;
  avatarUrl?: string;
};

const baseLink =
  "relative text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100";

export default function TeacherTopbar({
  navItems,
  showNavLinksOnDesktop,
  onLogout,
  avatarUrl,
}: TeacherTopbarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const shouldShowNavLinks = showNavLinksOnDesktop !== false;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const headerClass = isDark
    ? "border-[rgb(var(--border))] bg-gradient-to-r from-[#0B0017] via-[#140026] to-[#0B0017] text-[rgb(var(--text))]"
    : "border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))]";

  const containerClass = "mx-auto flex h-[72px]  items-center gap-3 px-4 sm:px-6 lg:px-8";

  const searchWrapClass = "border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]";

  const searchInputClass = "text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))]";

  const iconBtnClass = "text-[rgb(var(--muted))] hover:bg-[rgb(var(--surface-2))]";

  const logoutBtnClass = isDark
    ? "border border-violet-300/30 bg-white/5 text-white/70 hover:bg-white/10"
    : "bg-red-500 text-white hover:bg-red-600";

  const logoColor = isDark ? "text-violet-600" : "text-lime-500";

  const activeLinkClass = "text-[rgb(var(--text))] after:bg-[rgb(var(--accent))]";

  const inactiveLinkClass =
    "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] after:bg-[rgb(var(--muted))] hover:after:bg-[rgb(var(--text))]";

  return (
    <header className={`sticky top-0 z-40 w-full border-b ${headerClass}`}>
      <div className={containerClass}>
        {/* Mobile menu button (no sidebar; just opens topbar menu) */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition lg:hidden ${iconBtnClass}`}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className={`h-9 w-9 rounded-xl ${isDark ? "bg-violet-500/15" : "bg-lime-500/15"}`} />
          <span className={`text-lg font-semibold tracking-tight ${logoColor}`}>logo</span>
        </div>

        {/* Center nav (desktop) — only for LIGHT by default (matches screenshot) */}
        {shouldShowNavLinks && (
          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Right area */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search (desktop) */}
          <div className="hidden lg:block">
            <div className={`relative h-11 w-[360px] rounded-2xl border ${searchWrapClass}`}>
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]"
              />
              <input
                className={`h-full w-full rounded-2xl bg-transparent pl-10 pr-3 text-sm outline-none ${searchInputClass}`}
                placeholder="Search for students, assignment"
              />
            </div>
          </div>

          {/* Bell */}
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${iconBtnClass}`}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-[rgb(var(--muted))]" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className={`h-10 rounded-2xl px-5 text-sm font-semibold transition ${logoutBtnClass}`}
          >
            Logout
          </button>

          {/* Theme toggle */}
          <ThemeToggleButton />

          {/* Avatar */}
          <div className={`h-10 w-10 overflow-hidden rounded-full ${isDark ? "ring-2 ring-white/10" : ""}`}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <div className={`h-full w-full ${isDark ? "bg-white/10" : "bg-slate-100"}`} />
            )}
          </div>
        </div>
      </div>

      {/* Dark theme bottom glow strip (matches screenshot feel) */}
      {isDark && <div className="h-[4px] w-full bg-gradient-to-r from-transparent via-violet-700/35 to-transparent" />}

      {/* Mobile menu overlay + panel */}
      <div
        className={[
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={[
            "absolute left-1/2 top-4 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-3xl border p-4 shadow-2xl transition",
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
            isDark
              ? "border-white/10 bg-[#0B0017]/95 text-white"
              : "border-slate-200 bg-white text-slate-900",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Menu</div>
            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${iconBtnClass}`}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-[rgb(var(--muted))]" />
            </button>
          </div>

          {/* Mobile search */}
          <div className="mt-3">
            <div className={`relative h-11 w-full rounded-2xl border ${searchWrapClass}`}>
              <Search
                className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                  isDark ? "text-white/55" : "text-slate-600"
                }`}
              />
              <input
                className={`h-full w-full rounded-2xl bg-transparent pl-10 pr-3 text-sm outline-none ${searchInputClass}`}
                placeholder="Search for students, assignment"
              />
            </div>
          </div>

          {/* Mobile nav links (always visible here) */}
          <nav className="mt-4 grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-lime-500/10 text-lime-700"
                      : isDark
                        ? "text-white/75 hover:bg-white/5 hover:text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
