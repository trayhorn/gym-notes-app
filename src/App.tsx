import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import SharedLayout from "./components/SharedLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./components/AuthLayout";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";


function App() {
	const { isAuthenticated } = useContext(AuthContext)!;

  return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route index element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
			</Route>
			<Route element={<AuthLayout />}>
				<Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
				<Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />
			</Route>
		</Routes>
	);
}

export default App;