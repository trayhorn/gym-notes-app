import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import SharedLayout from "./components/SharedLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./components/AuthLayout";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Loader from "./components/Loader";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
	const { isAuthenticated, isLoading } = useContext(AuthContext)!;

	if (isLoading) return <Loader />;

  return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route
					index
					element={<ProtectedRoute><HomePage /></ProtectedRoute>}
				/>
				<Route
					path="/add_workout"
					element={<ProtectedRoute><AddWorkoutPage /></ProtectedRoute>}
				/>
			</Route>
			<Route element={<AuthLayout />}>
				<Route
					path="/login"
					element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
				/>
				<Route
					path="/register"
					element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
				/>
			</Route>
		</Routes>
	);
}

export default App;