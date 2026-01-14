import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import { ROUTES } from "./routes";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import QuizBuilderPage from "../../pages/quiz-builder/QuizBuilderPage";
import ReportsPage from "../../pages/reports/ReportsPage";
import MessagingPage from "../../pages/messaging/MessagingPage";


function PageShell({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">Placeholder page.</p>
    </div>
  );
}


const AssignmentsPage = () => <PageShell title="Assignments" />;  
const ChallengesPage = () => <PageShell title="Challenges" />;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.assignments} element={<AssignmentsPage />} />
          <Route path={ROUTES.quizBuilder} element={<QuizBuilderPage />} />
          <Route path={ROUTES.reports} element={<ReportsPage />} />
          <Route path={ROUTES.messaging} element={<MessagingPage />} />
          <Route path={ROUTES.challenges} element={<ChallengesPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
