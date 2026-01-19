/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { ROUTES } from "../../core/router/routes";
import { useAuth } from "../../core/auth/useAuth";
import { useTheme } from "../../shared/theme/useTheme";


import logoMarkLight from "../../../public/images/loginlight.png";
import logoMarkDark from "../../../public/images/logindark.png";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function BrandLogo({ theme }: { theme: "light" | "dark" }) {
  const brandName = "EduManage"; 
  const markSrc = theme === "dark" ? logoMarkDark : logoMarkLight;

  const textCls = theme === "dark" ? "text-[#360f90]" : "text-[#6dcc5d]";

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Mark (icon) */}
      <div className="h-11 w-11 sm:h-12 sm:w-12">
        <img
          src={markSrc}
          alt="Logo"
          className={`h-full w-full select-none object-contain ${theme === "dark" ? "drop-shadow-[0_0_18px_rgba(124,58,237,0.35)]" : ""
            }`}
          draggable={false}
        />
      </div>

      {/* Text (like your screenshots) */}
      <div className={`text-4xl font-black tracking-tight ${textCls}`}>
        {brandName}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { theme } = useTheme();
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
      ? "bg-[#0c0116] [background:radial-gradient(900px_circle_at_50%_35%,rgba(124,58,237,0.22),transparent_60%),radial-gradient(650px_circle_at_40%_38%,rgba(88,28,135,0.28),transparent_65%),#0c0116]"
      : "bg-[#f2f2f2]";

  const card =
    theme === "dark"
      ? "bg-[#140623]/70 backdrop-blur border border-violet-300/30 shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
      : "bg-[#d9d9d9] border border-black/5 shadow-[0_18px_60px_rgba(0,0,0,0.12)]";

  const labelText = theme === "dark" ? "text-white/80" : "text-slate-700";

  const input =
    theme === "dark"
      ? "bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-violet-400/50"
      : "bg-[#f4f4f4] border-[#d7ccff] text-slate-900 placeholder:text-slate-400 focus:border-violet-400";

  const btn =
    theme === "dark"
      ? "bg-violet-700 hover:bg-violet-800 text-white"
      : "bg-lime-500 hover:bg-lime-600 text-white";

  return (
    <div className={`min-h-screen w-full ${pageBg} flex items-center justify-center p-4`}>
      <form onSubmit={onSubmit} className={`w-full max-w-[460px] rounded-[28px] ${card} px-8 py-8`}>

        <BrandLogo theme={theme} />

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
                className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 ${theme === "dark" ? "text-white/60 hover:bg-white/10" : "text-slate-500 hover:bg-black/5"
                  }`}
                aria-label="Toggle password visibility"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <div
              className={`rounded-xl border px-4 py-3 text-xs ${theme === "dark"
                ? "border-red-400/30 bg-red-500/10 text-red-200"
                : "border-red-200 bg-red-50 text-red-700"
                }`}
            >
              {error}
            </div>
          ) : null}

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
