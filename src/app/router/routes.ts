export const ROUTES = {
  dashboard: "/dashboard",
  assignments: "/assignments",
  quizBuilder: "/quiz-builder",
  reports: "/reports",
  messaging: "/messaging",
  challenges: "/challenges",
} as const;

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES];
