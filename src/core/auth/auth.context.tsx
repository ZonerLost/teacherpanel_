/* eslint-disable react-refresh/only-export-components */
import React from "react";
import type { AuthState, AuthUser, LoginPayload } from "./auth.types";
import { clearToken, clearUserJson, getToken, getUserJson, setToken, setUserJson } from "./auth.storage";

type AuthContextValue = AuthState & {
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

/**
 * Replace this with your real API call:
 *   await api.post("/auth/login", payload)
 * return { token, user }
 */
async function fakeLoginApi(payload: LoginPayload): Promise<{ token: string; user: AuthUser }> {
  await new Promise((r) => setTimeout(r, 700));

  // simple demo validation
  if (!payload.email.includes("@") || payload.password.length < 4) {
    throw new Error("Invalid email or password.");
  }

  return {
    token: "demo_token_" + Date.now(),
    user: { id: "u1", email: payload.email, name: "Teacher" },
  };
}

function safeParseUser(json: string | null): AuthUser | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = React.useState<string | null>(() => getToken());
  const [user, setUserState] = React.useState<AuthUser | null>(() => safeParseUser(getUserJson()));

  const isAuthenticated = Boolean(token);

  const login = React.useCallback(async (payload: LoginPayload) => {
    const res = await fakeLoginApi(payload);

    setToken(res.token);
    setUserJson(JSON.stringify(res.user));

    setTokenState(res.token);
    setUserState(res.user);
  }, []);

  const logout = React.useCallback(() => {
    clearToken();
    clearUserJson();
    setTokenState(null);
    setUserState(null);
  }, []);

  const value: AuthContextValue = {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider />");
  return ctx;
}
    