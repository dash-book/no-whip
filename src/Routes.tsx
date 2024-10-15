import { Route, Routes as ReactRoutes } from "react-router-dom";

import { Login } from "./pages/Login";
import HomePage from "./pages/HomePage";
import EmployeesPage from "./pages/EmployeesPage";
import AuditPage from "./pages/AuditPage";
import TrackingPage from "./pages/TrackingPage";
import WhoIsWorkingPage from "./pages/WhoIsWorkingPage";
import { ProtectedRoute } from "./config/ProtectedRoute";

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <EmployeesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/audit"
        element={
          <ProtectedRoute>
            <AuditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tracking"
        element={
          <ProtectedRoute>
            <TrackingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/who-is-working"
        element={
          <ProtectedRoute>
            <WhoIsWorkingPage />
          </ProtectedRoute>
        }
      />
    </ReactRoutes>
  );
};
