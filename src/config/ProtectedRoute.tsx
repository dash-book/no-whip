import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/useAuth";
// import { useAuth } from "../hooks/useAuth";

interface Props {
  children: React.ReactElement;
}
export const ProtectedRoute = ({ children }: Props) => {
  const { isLogged } = useAuth();

  if (!isLogged) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
