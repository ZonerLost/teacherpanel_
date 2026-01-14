export const ROUTES = {
  login: "/login",

  dashboard: "/dashboard",
  assignments: "/assignments",
  quizBuilder: "/quiz-builder",
  reports: "/reports",
  messaging: "/messaging",
  challenges: "/challenges",
} as const;

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES];
