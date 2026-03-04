import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { isLoggedIn, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) return <div className="container py-4">Loading...</div>;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}