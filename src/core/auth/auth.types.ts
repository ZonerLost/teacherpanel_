export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
};
