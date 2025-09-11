import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { fetchCurrentUser } from "../api";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) return;

		fetchCurrentUser()
			.then(({ data }) => {
				setUser(data.username);
			})
			.catch(() => {
				localStorage.removeItem("authToken");
				setUser(null);
			});
	}, []);

	const login = (username: string) => {
		setUser(username);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext
			value={{
				user,
				login,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext>
	);
};