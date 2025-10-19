import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { JSX } from "react";

export default function ProtectedRoute({
	children,
}: {
	children: JSX.Element;
  }) {
	const { isAuthenticated } = useContext(AuthContext)!;

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
