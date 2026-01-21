// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Bell, Menu, Search, X } from "lucide-react";

// import { ConfirmDialog, ThemeToggleButton } from "../../shared/ui";
// import { useTheme } from "../../shared/theme/useTheme";
// import { useAuth } from "../../core/auth/useAuth";
// import { ROUTES } from "../../core/router/routes";
// import type { NavItem } from "./navItems";

// type TeacherTopbarProps = {
//   navItems: NavItem[];
//   showNavLinksOnDesktop?: boolean;
//   onLogout?: () => void;
//   avatarUrl?: string;
// };

// const LOGO_LIGHT_SRC = "/images/loginlight.png";
// const LOGO_DARK_SRC = "/images/logindark.png";

// const FALLBACK_AVATAR = "https://i.pravatar.cc/120?img=32";
// const BRAND_NAME = "EduManage";

// const baseLink =
//   "relative px-1 py-2 text-sm font-medium transition-colors " +
//   "after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full " +
//   "after:origin-left after:scale-x-0 after:transition-transform " +
//   "hover:after:scale-x-100";

// export default function TeacherTopbar({
//   navItems,
//   showNavLinksOnDesktop,
//   onLogout,
//   avatarUrl,
// }: TeacherTopbarProps) {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const shouldShowNavLinks = showNavLinksOnDesktop !== false;

//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [loggingOut, setLoggingOut] = React.useState(false);
//   const [confirmOpen, setConfirmOpen] = React.useState(false);

//   const handleLogout = () => setConfirmOpen(true);

//   const confirmLogout = () => {
//     if (loggingOut) return;
//     setLoggingOut(true);
//     setMobileOpen(false);
//     try {
//       logout();
//       onLogout?.();
//       navigate(ROUTES.login, { replace: true });
//     } finally {
//       setLoggingOut(false);
//       setConfirmOpen(false);
//     }
//   };

//   // ✅ Requested hover colors
//   const accent = isDark ? "#a43be0" : "#a4de02";
//   const accentRing = isDark ? "rgba(164,59,224,0.35)" : "rgba(164,222,2,0.35)";

//   const headerClass = isDark
//     ? "border-[rgb(var(--border))] bg-gradient-to-r from-[#0B0017] via-[#140026] to-[#0B0017] text-[rgb(var(--text))]"
//     : "border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))]";

//   const containerClass =
//     "mx-auto flex h-[64px] sm:h-[72px] items-center gap-2 sm:gap-3 px-3 sm:px-6 lg:px-8";

//   const searchWrapClass = "border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]";
//   const searchInputClass = "text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))]";

//   const iconBtnClass =
//     "text-[rgb(var(--muted))] hover:bg-[rgb(var(--surface-2))] " +
//     "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
//     "focus-visible:ring-[var(--nav-accent-ring)]";

//   const logoutBtnClass = isDark
//     ? "border border-violet-300/30 bg-white/5 text-white/70 hover:bg-white/10"
//     : "bg-red-500 text-white hover:bg-red-600";

//   const finalAvatarSrc = avatarUrl || FALLBACK_AVATAR;
//   const finalLogoSrc = isDark ? LOGO_DARK_SRC : LOGO_LIGHT_SRC;

//   const brandTextClass = isDark ? "text-[#360f90]" : "text-[#1dc200]";

//   // ✅ Link classes using CSS vars (works with Tailwind)
//   const activeLinkClass =
//     "text-[var(--nav-accent)] after:bg-[var(--nav-accent)] after:scale-x-100";
//   const inactiveLinkClass =
//     "text-[rgb(var(--muted))] hover:text-[var(--nav-accent)] after:bg-[var(--nav-accent)] " +
//     "after:opacity-0 hover:after:opacity-100";

//   return (
//     <header
//       className={`sticky top-0 z-40 w-full border-b ${headerClass}`}
//       style={
//         {
//           // ✅ Dynamic values applied here
//           "--nav-accent": accent,
//           "--nav-accent-ring": accentRing,
//         } as React.CSSProperties
//       }
//     >
//       <div className={containerClass}>
//         {/* Mobile menu button */}
//         <button
//           type="button"
//           onClick={() => setMobileOpen(true)}
//           className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition md:hidden ${iconBtnClass}`}
//           aria-label="Open menu"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         {/* Logo (MARK + TEXT) */}
//         <div className="flex items-center gap-2">
//           <div className="h-9 w-9 overflow-hidden">
//             <img
//               src={finalLogoSrc}
//               alt="Logo"
//               className={`h-full w-full object-contain ${isDark ? "drop-shadow-[0_0_14px_rgba(164,59,224,0.35)]" : ""
//                 }`}
//               loading="lazy"
//               decoding="async"
//               draggable={false}
//               onError={(e) => {
//                 e.currentTarget.style.display = "none";
//               }}
//             />
//           </div>

//           {/* Hide brand text on very small screens */}
//           <span className={`hidden sm:inline text-lg font-bold tracking-tight ${brandTextClass}`}>
//             {BRAND_NAME}
//           </span>
//         </div>

//         {/* Desktop nav links (tablet + laptop) */}
//         {shouldShowNavLinks && (
//           <nav className="hidden flex-1 items-center justify-center gap-6 md:flex lg:gap-7">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `${baseLink} ${isActive ? activeLinkClass : inactiveLinkClass}`
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </nav>
//         )}

//         {/* Right area */}
//         <div className="ml-auto flex items-center gap-2">
//           {/* Search (show on laptop+) */}
//           <div className="hidden lg:block">
//             <div className={`relative h-11 w-[320px] xl:w-[360px] rounded-2xl border ${searchWrapClass}`}>
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
//               <input
//                 className={`h-full w-full rounded-2xl bg-transparent pl-10 pr-3 text-sm outline-none ${searchInputClass}`}
//                 placeholder="Search for students, assignment"
//               />
//             </div>
//           </div>

//           {/* Bell */}
//           <button
//             type="button"
//             className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${iconBtnClass}`}
//             aria-label="Notifications"
//           >
//             <Bell className="h-5 w-5 text-[rgb(var(--muted))]" />
//           </button>

//           {/* Logout (hide on xs, show on sm+) */}
//           <button
//             type="button"
//             onClick={handleLogout}
//             className={`h-10 rounded-2xl px-5 text-sm font-semibold transition ${logoutBtnClass}`}
//             aria-label="Logout"
//             disabled={loggingOut}
//           >
//             {loggingOut ? "Logging out..." : "Logout"}
//           </button>

//           {/* Theme toggle */}
//           <ThemeToggleButton />

//           {/* Avatar */}
//           <div className={`h-10 w-10 overflow-hidden rounded-full ${isDark ? "ring-2 ring-white/10" : ""}`}>
//             <img
//               src={finalAvatarSrc}
//               alt="avatar"
//               className="h-full w-full object-cover"
//               loading="lazy"
//               decoding="async"
//               referrerPolicy="no-referrer"
//               onError={(e) => {
//                 e.currentTarget.src = FALLBACK_AVATAR;
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Dark theme bottom glow strip */}
//       {isDark && <div className="h-[4px] w-full bg-gradient-to-r from-transparent via-violet-700/35 to-transparent" />}

//       {/* Mobile menu overlay + panel */}
//       <div className={["fixed inset-0 z-50 md:hidden", mobileOpen ? "" : "pointer-events-none"].join(" ")}>
//         <div
//           className={[
//             "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
//             mobileOpen ? "opacity-100" : "opacity-0",
//           ].join(" ")}
//           onClick={() => setMobileOpen(false)}
//         />

//         <div
//           className={[
//             "absolute left-1/2 top-4 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-3xl border p-4 shadow-2xl transition",
//             mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
//             isDark ? "border-white/10 bg-[#0B0017]/95 text-white" : "border-slate-200 bg-white text-slate-900",
//           ].join(" ")}
//         >
//           <div className="flex items-center justify-between">
//             <div className="text-sm font-semibold">Menu</div>
//             <button
//               type="button"
//               className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${iconBtnClass}`}
//               onClick={() => setMobileOpen(false)}
//               aria-label="Close menu"
//             >
//               <X className="h-5 w-5 text-[rgb(var(--muted))]" />
//             </button>
//           </div>

//           {/* Mobile search */}
//           <div className="mt-3">
//             <div className={`relative h-11 w-full rounded-2xl border ${searchWrapClass}`}>
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
//               <input
//                 className={`h-full w-full rounded-2xl bg-transparent pl-10 pr-3 text-sm outline-none ${searchInputClass}`}
//                 placeholder="Search for students, assignment"
//               />
//             </div>
//           </div>

//           {/* Mobile nav links */}
//           <nav className="mt-4 grid grid-cols-1 gap-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setMobileOpen(false)}
//                 className={({ isActive }) =>
//                   [
//                     "rounded-2xl px-4 py-3 text-sm font-medium transition",
//                     isActive
//                       ? "text-[var(--nav-accent)] ring-1 ring-[var(--nav-accent-ring)] bg-black/5"
//                       : isDark
//                         ? "text-white/75 hover:bg-white/5 hover:text-[var(--nav-accent)]"
//                         : "text-slate-700 hover:bg-slate-100 hover:text-[var(--nav-accent)]",
//                   ].join(" ")
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Mobile Logout */}
//           <button
//             type="button"
//             onClick={handleLogout}
//             className={`mt-4 w-full h-11 rounded-2xl text-sm font-semibold transition ${logoutBtnClass}`}
//             disabled={loggingOut}
//           >
//             {loggingOut ? "Logging out..." : "Logout"}
//           </button>
//         </div>
//       </div>

//       <ConfirmDialog
//         open={confirmOpen}
//         onClose={() => setConfirmOpen(false)}
//         onConfirm={confirmLogout}
//         loading={loggingOut}
//         title="Logout"
//         confirmText="Logout"
//         cancelText="Cancel"
//         tone="danger"
//       />
//     </header>
//   );
// }


import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, Search, X, LogOut } from "lucide-react";

import { ConfirmDialog, ThemeToggleButton } from "../../shared/ui";
import { useTheme } from "../../shared/theme/useTheme";
import { useAuth } from "../../core/auth/useAuth";
import { ROUTES } from "../../core/router/routes";
import type { NavItem } from "./navItems";

type TeacherTopbarProps = {
  navItems: NavItem[];
  showNavLinksOnDesktop?: boolean;
  onLogout?: () => void;
  avatarUrl?: string;
};

const LOGO_LIGHT_SRC = "/images/loginlight.png";
const LOGO_DARK_SRC = "/images/logindark.png";

const FALLBACK_AVATAR = "https://i.pravatar.cc/120?img=32";
const BRAND_NAME = "EduManage";

const baseLink =
  "relative px-1 py-2 text-sm font-medium transition-colors " +
  "after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full " +
  "after:origin-left after:scale-x-0 after:transition-transform " +
  "hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nav-accent-ring)] rounded";

export default function TeacherTopbar({
  navItems,
  showNavLinksOnDesktop,
  onLogout,
  avatarUrl,
}: TeacherTopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const shouldShowNavLinks = showNavLinksOnDesktop !== false;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  // ✅ Requested hover colors
  const accent = isDark ? "#a43be0" : "#a4de02";
  const accentRing = isDark ? "rgba(164,59,224,0.35)" : "rgba(164,222,2,0.35)";

  const headerClass = isDark
    ? "border-[rgb(var(--border))] bg-gradient-to-r from-[#0B0017] via-[#140026] to-[#0B0017] text-[rgb(var(--text))]"
    : "border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))]";

  const containerClass =
    "mx-auto flex w-full  items-center gap-2 sm:gap-3 px-3 sm:px-6 lg:px-8 h-[64px] sm:h-[72px]";

  const searchWrapClass = "border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]";
  const searchInputClass =
    "text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))]";

  const iconBtnClass =
    "text-[rgb(var(--muted))] hover:bg-[rgb(var(--surface-2))] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-[var(--nav-accent-ring)] rounded-xl";

  const logoutBtnClass = isDark
    ? "border border-violet-300/30 bg-white/5 text-white/70 hover:bg-white/10"
    : "bg-red-500 text-white hover:bg-red-600";

  const finalAvatarSrc = avatarUrl || FALLBACK_AVATAR;
  const finalLogoSrc = isDark ? LOGO_DARK_SRC : LOGO_LIGHT_SRC;

  // NOTE: You had these colors specifically; keeping them
  const brandTextClass = isDark ? "text-[#360f90]" : "text-[#1dc200]";

  const activeLinkClass =
    "text-[var(--nav-accent)] after:bg-[var(--nav-accent)] after:scale-x-100";
  const inactiveLinkClass =
    "text-[rgb(var(--muted))] hover:text-[var(--nav-accent)] after:bg-[var(--nav-accent)] " +
    "after:opacity-0 hover:after:opacity-100";

  const handleLogout = () => {
    setMobileOpen(false);
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      logout();
      onLogout?.();
      navigate(ROUTES.login, { replace: true });
    } finally {
      setLoggingOut(false);
      setConfirmOpen(false);
    }
  };

  // ✅ Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ✅ Close mobile menu when resizing to desktop
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false); // md breakpoint
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ✅ Escape to close + lock body scroll when open
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b ${headerClass}`}
      style={
        {
          "--nav-accent": accent,
          "--nav-accent-ring": accentRing,
        } as React.CSSProperties
      }
    >
      <div className={containerClass}>
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className={`inline-flex h-10 w-10 items-center justify-center transition md:hidden ${iconBtnClass}`}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo + brand */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 shrink-0 overflow-hidden">
            <img
              src={finalLogoSrc}
              alt="Logo"
              className={[
                "h-full w-full object-contain",
                isDark ? "drop-shadow-[0_0_14px_rgba(164,59,224,0.35)]" : "",
              ].join(" ")}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <span
            className={`hidden sm:inline truncate text-lg font-bold tracking-tight ${brandTextClass}`}
            title={BRAND_NAME}
          >
            {BRAND_NAME}
          </span>
        </div>

        {/* Desktop nav links */}
        {shouldShowNavLinks && (
          <nav className="hidden flex-1 items-center justify-center gap-5 md:flex lg:gap-7">
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
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Search (laptop+) */}
          <div className="hidden lg:block">
            <div
              className={`relative h-11 w-[300px] xl:w-[360px] rounded-2xl border ${searchWrapClass}`}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
              <input
                type="search"
                className={`h-full w-full rounded-2xl bg-transparent pl-10 pr-3 text-sm outline-none ${searchInputClass}`}
                placeholder="Search for students, assignment"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Bell */}
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center transition ${iconBtnClass}`}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-[rgb(var(--muted))]" />
          </button>

          {/* Logout: icon on xs, button on sm+ */}
          <button
            type="button"
            onClick={handleLogout}
            className={`inline-flex h-10 w-10 items-center justify-center transition sm:hidden ${iconBtnClass}`}
            aria-label="Logout"
            disabled={loggingOut}
          >
            <LogOut className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className={`hidden sm:inline-flex h-10 items-center rounded-2xl px-5 text-sm font-semibold transition ${logoutBtnClass}`}
            disabled={loggingOut}
            aria-label="Logout"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>

          {/* Theme toggle */}
          <ThemeToggleButton />

          {/* Avatar */}
          <div
            className={[
              "h-10 w-10 overflow-hidden rounded-full shrink-0",
              isDark ? "ring-2 ring-white/10" : "",
            ].join(" ")}
          >
            <img
              src={finalAvatarSrc}
              alt="avatar"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_AVATAR;
              }}
            />
          </div>
        </div>
      </div>

      {/* Dark theme bottom glow strip */}
      {isDark && (
        <div className="h-[4px] w-full bg-gradient-to-r from-transparent via-violet-700/35 to-transparent" />
      )}

      {/* Mobile menu overlay + panel */}
      <div
        className={[
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setMobileOpen(false)}
        />

        <div
          role="dialog"
          aria-modal="true"
          className={[
            "absolute left-1/2 top-4 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2",
            "rounded-3xl border p-4 shadow-2xl transition",
            "max-h-[calc(100dvh-2rem)] overflow-auto",
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
              className={`inline-flex h-10 w-10 items-center justify-center transition ${iconBtnClass}`}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-[rgb(var(--muted))]" />
            </button>
          </div>

          {/* Mobile search */}
          <div className="mt-3">
            <div className={`relative h-11 w-full rounded-2xl border ${searchWrapClass}`}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
              <input
                type="search"
                className={`h-full w-full rounded-2xl bg-transparent pl-10 pr-3 text-sm outline-none ${searchInputClass}`}
                placeholder="Search for students, assignment"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Mobile nav links */}
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
                      ? "text-[var(--nav-accent)] ring-1 ring-[var(--nav-accent-ring)] bg-black/5"
                      : isDark
                      ? "text-white/75 hover:bg-white/5 hover:text-[var(--nav-accent)]"
                      : "text-slate-700 hover:bg-slate-100 hover:text-[var(--nav-accent)]",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className={`mt-4 w-full h-11 rounded-2xl text-sm font-semibold transition ${logoutBtnClass}`}
            disabled={loggingOut}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmLogout}
        loading={loggingOut}
        title="Logout"
        confirmText="Logout"
        cancelText="Cancel"
        tone="danger"
      />
    </header>
  );
}
