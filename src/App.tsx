import { Routes, Route, Navigate } from "react-router";
import {
  HomePage,
  AnalyticsPage,
  AddWorkoutPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  RequestPasswordResetPage,
} from "./pages";
import SharedLayout from "./components/SharedLayout";
import AuthLayout from "./components/AuthLayout";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./components/VerifyEmail";

function App() {
  const { isAuthenticated, isLoading } = useContext(AuthContext)!;

  const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";

  if (isLoading) return <Loader />;

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_workout"
            element={
              <ProtectedRoute>
                <AddWorkoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={lastVisitedPage} />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to={lastVisitedPage} />
              ) : (
                <RegisterPage />
              )
            }
          />
        </Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/request-password-reset"
          element={<RequestPasswordResetPage />}
        />
        <Route path="/reset-password" element={<ForgotPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
