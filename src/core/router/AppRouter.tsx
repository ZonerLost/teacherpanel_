import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { ROUTES } from "./routes";

import RequireAuth from "../auth/RequireAuth";
import RedirectIfAuth from "../auth/RedirectIfAuth";
import { AuthProvider } from "../auth/auth.context";

import LoginPage from "../../pages/auth/LoginPage";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import QuizBuilderPage from "../../pages/quiz-builder/QuizBuilderPage";
import ReportsPage from "../../pages/reports/ReportsPage";
import MessagingPage from "../../pages/messaging/MessagingPage";
import ChallengesPage from "../../pages/challenges/ChallengesPage";
import AssignmentsPage from "../../pages/assignments/AssignmentsPage";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<RedirectIfAuth />}>
            <Route path={ROUTES.login} element={<LoginPage />} />
          </Route>

          {/* Protected */}
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
              <Route path={ROUTES.dashboard} element={<DashboardPage />} />
              <Route path={ROUTES.assignments} element={<AssignmentsPage />} />
              <Route path={ROUTES.quizBuilder} element={<QuizBuilderPage />} />
              <Route path={ROUTES.reports} element={<ReportsPage />} />
              <Route path={ROUTES.messaging} element={<MessagingPage />} />
              <Route path={ROUTES.challenges} element={<ChallengesPage />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
