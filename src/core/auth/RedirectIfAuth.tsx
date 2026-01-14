import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { useAuth } from "./useAuth";

export default function RedirectIfAuth() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={ROUTES.dashboard} replace />;
  return <Outlet />;
}
