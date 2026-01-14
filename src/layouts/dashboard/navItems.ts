import { ROUTES, type AppRoutePath } from "../../app/router/routes";

export type NavItem = {
  label: string;
  path: AppRoutePath;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: ROUTES.dashboard },
  { label: "Assignments", path: ROUTES.assignments },
  { label: "Quiz Builder", path: ROUTES.quizBuilder },
  { label: "Reports", path: ROUTES.reports },
  { label: "Messaging", path: ROUTES.messaging },
  { label: "Challenges", path: ROUTES.challenges },
];
