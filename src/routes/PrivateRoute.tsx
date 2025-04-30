import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

const PrivateRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthState();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoutes;
