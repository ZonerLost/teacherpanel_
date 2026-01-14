/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { ROUTES } from "../../core/router/routes";
import { useAuth } from "../../core/auth/useAuth";

function useResolvedTheme(): "light" | "dark" {
  const [t, setT] = React.useState<"light" | "dark">(() => {
    const ls = localStorage.getItem("theme");
    if (ls === "dark" || ls === "light") return ls;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  React.useEffect(() => {
    const id = window.setInterval(() => {
      const ls = localStorage.getItem("theme");
      const next =
        ls === "dark" || ls === "light"
          ? ls
          : document.documentElement.classList.contains("dark")
          ? "dark"
          : "light";
      setT(next);
    }, 400);
    return () => window.clearInterval(id);
  }, []);

  return t;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginPage() {
  const theme = useResolvedTheme();
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation() as any;

  const from = location?.state?.from || ROUTES.dashboard;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canSubmit = isValidEmail(email) && password.trim().length >= 4 && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) return setError("Please enter a valid email.");
    if (password.trim().length < 4) return setError("Password must be at least 4 characters.");

    try {
      setLoading(true);
      await login({ email: email.trim(), password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pageBg =
    theme === "dark"
      ? "bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_45%),radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.12),transparent_45%),#07010f]"
      : "bg-[#f7f7f7]";

  // Card styling matches screenshot:
  // - light: grey card, soft shadow, big radius
  // - dark: glassy purple card with border outline
  const card =
    theme === "dark"
      ? "bg-white/5 border border-violet-300/30 shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
      : "bg-[#dedede] border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.10)]";

  const logoText = theme === "dark" ? "text-violet-500" : "text-[#111827]";
  const labelText = theme === "dark" ? "text-white/80" : "text-slate-700";

  const input =
    theme === "dark"
      ? "bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-violet-400/50"
      : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-lime-400";

  const btn =
    theme === "dark"
      ? "bg-violet-700 hover:bg-violet-800 text-white"
      : "bg-lime-400 hover:bg-lime-500 text-white";

  return (
    <div className={`min-h-screen w-full ${pageBg} flex items-center justify-center p-4`}>
      <form
        onSubmit={onSubmit}
        className={`w-full max-w-[460px] rounded-[28px] ${card} px-8 py-8`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className={`text-4xl font-black tracking-tight ${logoText}`}>
            {/* replace with your SVG logo */}
            ✳ <span className={theme === "dark" ? "text-violet-500" : "text-slate-900"}>EduManage</span>
          </div>
        </div>

        {/* Fields */}
        <div className="mt-8 space-y-5">
          <div>
            <label className={`text-xs font-semibold ${labelText}`}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${input}`}
              placeholder="your.email@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className={`text-xs font-semibold ${labelText}`}>Password</label>

            <div className="relative mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition ${input}`}
                placeholder="••••••••"
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 ${
                  theme === "dark" ? "text-white/60 hover:bg-white/10" : "text-slate-500 hover:bg-black/5"
                }`}
                aria-label="Toggle password visibility"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error (inline – clean + matches UI better than popup) */}
          {error ? (
            <div
              className={`rounded-xl border px-4 py-3 text-xs ${
                theme === "dark"
                  ? "border-red-400/30 bg-red-500/10 text-red-200"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {error}
            </div>
          ) : null}

          {/* Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`mt-2 w-full rounded-xl py-3 text-sm font-bold transition disabled:opacity-60 disabled:cursor-not-allowed ${btn}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
