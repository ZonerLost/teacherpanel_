import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { useAuth } from "./useAuth";

export default function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
